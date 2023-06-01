import { useEffect, useState } from "react";
import TaskCSS from "../../../form/Task/Task.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callReviewsAPI, callReviewsRegistAPI } from "../../../apis/ReviewAPICalls";
import ReviewItem from "./ReviewItem";
import { toast } from "react-toastify";



function ReviewList({ task, reviews }){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { regist } = useSelector((state) => state.reviewReducer);
    const taskCode = reviews[0]?.task?.taskCode;
    const [ review, setReview ] = useState({
        content : "",
        task : task,
      });

    console.log("task" , task);
    console.log("reviews" , reviews);
    console.log("reviews" , review);
    console.log("taskCode" , taskCode);

    const onReviewChangeHandler = (e) => {

        setReview((prevForm) => ({
            ...prevForm,
            [e.target.name] : e.target.value,
            }
        ));
        console.log(review);
    }

    // useEffect(()=> {
    //   dispatch(callReviewsAPI(reviews?.task?.taskCode));

    // },[ , useSelector]);

    
    /* 댓글 등록 및 재조회 */
    const handleSubmitContent = async (e) => {
            
      try{
        
        await dispatch(callReviewsRegistAPI(review));
        dispatch(callReviewsAPI(taskCode));
        setReview();

        toast.success('댓글 등록 ', {
          position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
          autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
          hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
        });

      } catch (error) {
        
        toast.error('댓글 등록 오류 '+ error, {
          position: toast.POSITION.TOP_CENTER, // 토스트 위치 (옵션)
          autoClose: 2000, // 자동으로 닫히는 시간 (ms) (옵션)
          hideProgressBar: false, // 진행 막대 숨김 여부 (옵션)
          progressStyle: {
            backgroundColor: '#ff000074', // 프로그레스 바 배경색
            height: '5px', // 프로그레스 바 
          },
        });
        console.log(error);
      }

    }


  

    return (
        <div className={TaskCSS.RightDiv}>
          <div className={TaskCSS.reviewList}>{reviews?.reviewCode}
           { 
              reviews 
                && Array.isArray(reviews) 
                && reviews.map(reviews => <ReviewItem key={ reviews?.reviewCode } review={reviews}/>)
           }
          </div> 
          <div className={TaskCSS.reviewWrite}>
            <textarea name="content" onChange={onReviewChangeHandler} className={TaskCSS.textbox}/>
            <button className={TaskCSS.writeBtn} onClick={handleSubmitContent}>등록</button>
          </div>
        </div>
      );

}

export default ReviewList;