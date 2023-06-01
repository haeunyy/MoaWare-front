import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_REVIEWS = 'review/GET_REVIEWS';
const POST_REVIEW = 'review/POST_REVIEW';
const PUT_REVIEW = 'review/PUT_REVIEW';

export const { review : { getReviews, postReview, putReview }} = createActions({
    [GET_REVIEWS]: res => res.data,
    [POST_REVIEW]: res => res,
    [PUT_REVIEW]: res => res,
});

/* 리듀서 */
const reviewReducer = handleActions(
    {
        [GET_REVIEWS] : (state, { payload }) => ({ ...state, reviews : payload }),
        [POST_REVIEW] : (state, { payload }) => ({ ...state, regist : payload }),
        [PUT_REVIEW] : (state, { payload }) => ({ ...state, put : payload }),
    }
, initialState);

export default reviewReducer;   