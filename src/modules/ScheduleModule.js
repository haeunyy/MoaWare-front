import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_SCHEDULES = 'schedule/GET_SCHEDULES';
const GET_SCHEDULE = 'schedule/GET_SCHEDULE';
const POST_SCHEDULE = 'schedule/POST_SCHEDULE';

export const { schedule: { getSchedules, getSchedule, postSchedule } } = createActions({
    [GET_SCHEDULES]: res => res.data,
    [GET_SCHEDULE]: res => res.data,
    [POST_SCHEDULE]: res => res,
});

/* 리듀서 */
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULES] : (state, { payload }) => ({ schedules : payload }),
        [GET_SCHEDULE] : (state, { payload }) => ({ ...state, schedule : payload }),
        [POST_SCHEDULE] : (state, { payload }) => ({ ...state, insert : payload })
    }
, initialState);

export default scheduleReducer;