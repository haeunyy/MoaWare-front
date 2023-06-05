import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAdminEmpDeleteAPI, callAdminEmpListAPI } from '../../apis/AdminAPICalls';
import PagingBar from "../../components/common/PagingBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CSS from "./AdminEmployees.module.css";
import { NavLink } from 'react-router-dom';

function AdminEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employees = useSelector(state => state.employeeReducer);
    const pageInfo = employees.pageInfo;
    const [selectedEmps, setSelectedEmps] = useState([]);


    const { del } = useSelector(state => state.adminReducer);

   const [currentPage, setCurrentPage] = useState(1);
//    const { empCode } = useParams();
//    console.log("empCode : ", empCode);




    useEffect(
        () => {
        dispatch(callAdminEmpListAPI({ currentPage }));
        },
       [currentPage]
       );


       const onClickTableTr = (empCode) => {
        navigate(`/admin/emp/list/${empCode}`);
       };




       useEffect(() => {
        if (del?.status === 200) {
          alert('퇴직 처리가 완료되었습니다.');
          dispatch(callAdminEmpListAPI({ currentPage }))
        }
      }, [del]);
         
    
      
  const handleCheckboxChange = (event, empCode) => {
    // 이벤트 전파 방지
    event.stopPropagation(); 
    setSelectedEmps(empCode);
    if(selectedEmps == empCode) {
        setSelectedEmps(null);
    }
};

const onClickDelete = () => {
    console.log('클릭ㅎㅎ',selectedEmps)
    dispatch(callAdminEmpDeleteAPI({ empCode : selectedEmps})); // boardCode 배열 전달
  };










       return (
        <>

        
            <div className={CSS.main}>
                
            <div className={CSS.menutitle}> 계정 관리
            <div className={CSS.content}>
                    <button>
                        <NavLink to="/admin/emp/regist">
                        계정 생성
                        </NavLink>
                    </button>
                    </div>  </div>  
                    
            <table className={CSS.table}>


                    <thead>
                        <tr className={ CSS.th }> 
                        <th><input type="checkbox" id="checkAll" /></th>

                            <th>사번</th>
                            <th>이름</th>
                            <th>ID</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>입사일</th>
                            <th>퇴직 여부</th>
                            <th>권한</th>
                            <th>상세정보</th>

                        </tr>
                    </thead>
                        <tbody >
                    
                            {employees?.data &&
                            employees.data.map((e) => ( 
                            
                            // {Array.isArray(employees) &&
                            //      employees.map((empList) => (

                                    <tr 
                                    className={CSS.td}
                                    key={e.empCode}
                                    onClick={() => onClickTableTr(e.empCode)}>
                                   <input
                                    type="checkbox" 
                                    // checked={selectedPosts.includes(post.postCode)}
                                    checked={selectedEmps === e.empCode}
                                    onChange={(event) => handleCheckboxChange(event, e.empCode)}
                                                onClick={(event) => event.stopPropagation()}
                                                />
                                        <td>{e.empCode}</td>
                                        <td>{e.empName}</td>
                                        <td>{e.empID}</td>
                                        <td>{e.dept.deptName}</td>
                                        <td>{e.job.jobName}</td>
                                        <td>{e.hireDate}</td>                                
                                        <td>{e.retireYn}</td>
                                        <td></td>
                                        <td></td>
                                    

                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className={CSS.deletepost}>
                                        <button onClick={onClickDelete}>
                                            퇴직처리
                                        </button>
                                    </div>
                                    <div>
                {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
            </div>
            </div>
            
        
        </>
    );
}

export default AdminEmployees;
