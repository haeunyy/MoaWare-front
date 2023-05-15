import Layout from "./layouts/Layout";
import Main from "./pages/users/Main";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OrganizaionList from "./pages/organization/OrganizationList";
import './App.css';

import Login from "./pages/member/Login";

import Work from "./pages/users/works/Work";
import WorkLayout from './layouts/WorkLayout';
import WorkRestReq from './pages/users/works/WorkRestReq';
import WorkRestReqList from './pages/users/works/WorkRestReqList';
import WorkRestList from './pages/users/works/WorkRestList';
import LoginIdFind from "./pages/member/LoginIdFind";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main/>} />
          {/* 조직도 */}
          <Route path="org">
            <Route index element={<OrganizaionList/>}/>
          </Route>
          {/* 근태관리 */}
            {/* <Route path="work"> */}
          <Route path="work" element={ <WorkLayout/>}>
            <Route index element={<Work/>}/>
            <Route path="restReq" element={<WorkRestReq/>}/>
            <Route path="restReqList" element={<WorkRestReqList/>}/>
            <Route path="restList" element={<WorkRestList/>}/>
          </Route>

        </Route>
          {/* 로그인  */}
          <Route path="login" element={<Login/>}>
            <Route path="idfind" element={<LoginIdFind/>}/>
            <Route path="pwdfind" element={<LoginIdFind/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;