import { useEffect,useRef,useState } from 'react';
import payCSS from './Payment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CallPaymentListAPI } from '../../apis/PaymentAPICalls';



function PaymentList () {

    const [name, setName] = useState('');
    const [name2, setName2] = useState('');
    const [number, setNumber] = useState('');
    const [dept, setDept] = useState('');
    const [job, setJob] = useState('');
    const [payStatus, setPayStatus] = useState('');
    const [payDate, setPayDate] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [text, setText] = useState('');
    const [htmlString, setHtmlString] = useState('');
    const dispatch = useDispatch();
    const { pay } = useSelector( state => state.paymentReducer );

    const htmlRef = useRef(document.createElement('div'));

    const [ form, setForm ] = useState({
    });

    const onChangeHandler = (e) => {
   
      if(e.target.name == 'total'){
        setForm({
          ...form,
        [e.target.name] :  e.target.value,
        'supply' : Math.round(e.target.value/1.1),
        'tax' : Math.round(e.target.value/1.1*0.1)
      }
        )
      } else {
        setForm(
          {
            ...form,
            [e.target.name] : e.target.value
          }
        );
      }

      console.log("form 핸들러 : " , form);

    }

    

  

    const [ isButton, setIsButton ] = useState(false);
    const onButtonHandler= () => {
      if(isButton){
        setIsButton(false);
      } else {
        setIsButton(true)
      }
    }

    const payPath = pay&&pay[0].form.formPath;
  
    // console.log( "payPath : ", payPath);
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
    const handleNameChange2 = (event) => {
      setName2(event.target.value);
    };
  
    const handleNumberChange = (event) => {
      setNumber(event.target.value);
    };

    const handledeptChange = (event) => {
      setDept(event.target.value);
    };

    
  
    
    useEffect(() => {
      
      dispatch(CallPaymentListAPI());

      const processHtmlString = (html) => {

        let modifiedHTML = html;
        // modifiedHTML = modifiedHTML.replace(/<input/g, '<input readOnly');
        Object.entries(form).forEach(([key, value]) => {
          const regex = new RegExp(`{${key}}`, "g");
          if(key==='total'){
            console.log("key : ", key );
          }
          if (form[key] === undefined || form[key] === null) {
            modifiedHTML = modifiedHTML.replace(regex, "");
          } else {
            console.log("key : ", key );
            modifiedHTML = modifiedHTML.replace(regex, `"${value}"`.trim() || " ");
          }
       
        });  
   
        return modifiedHTML;
      };
      
      console.log("form : ", form);
      // DB에서 가져온 HTML 문자열
      const htmlFromDB = payPath;
      if (payPath) {
      const filteredHTML = processHtmlString(htmlFromDB);
      // console.log( "filteredHTML : ", filteredHTML);
      setHtmlString(filteredHTML);
      }
    }, [isButton]);

      

    //console.log("htmlString : ", htmlString);
    // console.log("filteredHTML : ", filteredHTML);

    useEffect(() => {
      const targetElement = htmlRef.current.getElementsByTagName('input');
      if (targetElement) {
        for (let i = 0; i < targetElement.length; i++) {
          targetElement[i].addEventListener('change', onChangeHandler);
          targetElement[i].value=""
        }
        // return () => {
        //   for (let i = 0; i < targetElement.length; i++) {
        //     targetElement[i].removeEventListener('change', onChangeHandler);
        //   }
          
        // };
      }
      console.log("htmlRef : ", htmlRef.current.getElementsByTagName('input'));
    }, [htmlString]);

  

    
    return (
      <div className={payCSS.background}>
        <div>
          <label className={payCSS.payName} >이름</label>
          <input type="text" value={name2} onChange={handleNameChange2} className={payCSS.input} />
        </div>
        <div>
          <label>번호</label>
          <input type="text" value={number} onChange={handleNumberChange} />.
        </div>
        <button onClick={onButtonHandler}>HTML 보여주기</button>
        <div ref={htmlRef} dangerouslySetInnerHTML={{ __html: `${htmlString}` }} />
             
              <table className={payCSS.docuDiv}>
                <tbody className={payCSS.docuDiv}>
                  <tr>
                    <th colSpan='6' className={payCSS.docuTitle}>프로젝트 기안서</th>
                  </tr>
                  <tr>
                    <th className={payCSS.docuLabel}>작성일자</th>
                    <td ><input type='text' name="name"className={payCSS.docuInput}
                      value={form.name} onChange={onChangeHandler}/></td>
                    <th>담당자</th>
                    <td ><input type='text' className={payCSS.docuInput} name="dept"
                    value={form.dept} onChange={onChangeHandler}/></td>
                  </tr>
                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>

                  <tr>
                    <th>직 급</th>
                    <td colSpan='3'><input type='text' className={payCSS.docuInput}
                    name="job" value={form.job} onChange={onChangeHandler}/></td>
                  </tr>
                </tbody>
              </table>
      </div>

      
    );

  };

export default PaymentList