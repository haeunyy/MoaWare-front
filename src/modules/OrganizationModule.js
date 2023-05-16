import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    subOrg: []
};

/* 액션 */
const GET_ORGANIZATION = 'org/GET_ORGANIZATION';
const GET_ORGANIZATION_SUB = 'org/GET_ORGANIZATION_SUB';
const GET_ORGANIZATION_SEARCH = 'org/GET_ORGANIZATION_SEARCH';

export const { org : { getOrganization, getOrganizationSub, getOrganizationSearch }} = createActions({
    [GET_ORGANIZATION] : res => res.data,
    [GET_ORGANIZATION_SUB] : res => res.data,
    [GET_ORGANIZATION_SEARCH]: res => res.data
})

/* 리듀서 */
const organizationReducer = handleActions({
    [GET_ORGANIZATION] : (state, { payload } ) => ({org : payload}),
    [GET_ORGANIZATION_SUB]: (state, { payload }) => ({
        ...state,
        subOrg: payload
      }),

}, initialState)

export default organizationReducer;