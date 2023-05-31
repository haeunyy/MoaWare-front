import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCSS from './Task.module.css';import { callProjectAPI, callTaskDetailAPI, callTaskRegistAPI } from "../../apis/ProjectAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberId } from "../../utils/TokenUtils";


function TaskRegist() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { project, post } = useSelector(state => state.projectReducer);
    const { projCode } = useParams();
    const [ stage, setStage ] = useState('');
    const [ type, setType ] = useState('');
    const [ form, setForm ] = useState({
        taskName : "",
        taskNotice : "",
        startDate : "",
        endDate : "",
        type : "",
        stage : "",
        project : {},
    })

    let endDate = '';

    


    useEffect(()=>{
        dispatch(callProjectAPI(projCode));
    },[]);



    useEffect(()=>{

        if(project){
            endDate = project.endDate.substring(10,0);
        }

        setForm({ project : project });
        
        console.log(endDate);

    },[project]);

    useEffect(() => {
        if(post?.status === 200){
            alert(post.message);
            navigate(`/task/${form.project.projCode}`);
        }
    },[post]);



    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });

        console.log(form);
    }


    const onClickHandler = () => {

        dispatch(callTaskRegistAPI(form));
    };


    return project && (
        <div className={TaskCSS.wrapper}>
            <div className={TaskCSS.wrap}>
                <div className={TaskCSS.mainTitle}>
                    업무 관리
                </div>
                <div className={TaskCSS.mainContent}>
                    <div className={TaskCSS.leftDiv}>
                        <div className={TaskCSS.leftTitle}>
                            <p className={TaskCSS.projTitlebold}>프로젝트 명</p>
                            <span className={TaskCSS.projTitle}>{ project?.projName }</span>
                        </div>  
                        <div className={TaskCSS.leftContent}>
                            <div className={TaskCSS.tableDiv}>
                                <table className={TaskCSS.leftTable}>
                                    <tbody className={TaskCSS.tableTbody}>
                                        <tr className={TaskCSS.tableTaskName}>
                                            <td className={TaskCSS.tableTitle}>업무명</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <input 
                                                    className={TaskCSS.inputbox}
                                                    type="text" 
                                                    name="taskName"
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStartDate}>
                                            <td className={TaskCSS.tableTitle}>업무시작</td>
                                            <td className={TaskCSS.tableBorder}>
                                            <input 
                                                className={TaskCSS.inputbox}
                                                type="date" 
                                                name="startDate"
                                                max={endDate}
                                                onChange={onChangeHandler}
                                            />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskEndDate}>
                                            <td className={TaskCSS.tableTitle}>업무종료</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <input 
                                                    className={TaskCSS.inputbox}
                                                    type="date" 
                                                    name="endDate"
                                                    min={form?.startDate}
                                                    max={endDate}
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskStage}>
                                            <td className={TaskCSS.tableTitle}>진행단계</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <select name="stage" onChange={onChangeHandler}>
                                                    <option value="todo">해야할 일</option>
                                                    <option value="ing">진행중</option>
                                                    <option value="done">완료</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={TaskCSS.tableType}>업무단계</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <select name="type" onChange={onChangeHandler}>
                                                    <option value="plan">기획</option>
                                                    <option value="design">설계</option>
                                                    <option value="test">테스트</option>
                                                    <option value="dev">개발</option>
                                                    <option value="pre">시연</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className={TaskCSS.tableTaskNotice}>
                                            <td className={TaskCSS.tableTitle}>공지사항</td>
                                            <td className={TaskCSS.tableBorder}>
                                                <textarea 
                                                    className={TaskCSS.inputbox}
                                                    name="taskNotice"
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={TaskCSS.btnMargin}>
                                <button onClick={onClickHandler}>등록</button>
                            </div>
                        </div>
                    </div>
                <div className={TaskCSS.RightDiv}></div>
            </div>
        </div>
    </div>
    );
}


export default TaskRegist;