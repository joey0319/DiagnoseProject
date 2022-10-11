import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainNavBar from "./components/MainNavBar";
import CommunityPage from "./screens/Community/Community";
import CommunityShowpetDetail from "./screens/Community/CommunityShowpetDetail";
import ShowpetCreate from "./screens/Community/ShowpetCreate";
import DiagnosePage from "./screens/Diagnose";
import Main from "./screens/Main";
import MyPage from "./screens/MyPage";
import Login from "./screens/Login";
import Join from "./screens/Join";
import FirstAidPage from "./screens/FirstAid";
import DiagnoseList from "./screens/DiagnoseList";
import LostCreate from "./screens/Community/LostCreate";
import ArticleList from "./screens/ArticleList";
import DiagnoseDetail from "./screens/DiagnoseDetail";
import ProfileUpdate from "./screens/ProfileUpdate";
import LoginCallback from "./screens/LoginCallback";

function App() {
  return (
    <>
      <MainNavBar />
      <div>
        <Routes>
          <Route element={<Main />} path="/"></Route>
          <Route element={<DiagnosePage />} path="/diagnose"></Route>
          <Route element={<FirstAidPage />} path="/firstaid"></Route>
          <Route path="/show-pet/list" element={<CommunityPage />}>
            {/* <Route index element={<CommunityPage />} />
            <Route element={<ShowpetCreate />} path="create" />
            <Route element={<LostCreate />} path="create2" /> */}
          </Route>
          <Route
            element={<CommunityShowpetDetail />}
            path="/show-pet/detail/:id"
          />
          <Route element={<ShowpetCreate />} path="/show-pet" />
          <Route element={<CommunityPage />} path="/lost/list" />
          <Route element={<LostCreate />} path="/lost" />
          <Route element={<MyPage />} path="/mypage"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Join />} path="/join"></Route>
          <Route element={<DiagnoseList />} path="/diagnoselist"></Route>
          {/* <Route element={<LostList />} path="/lostlist"></Route>
          <Route element={<ShowpetList />} path="/showpetlist"></Route> */}
          <Route element={<ArticleList />} path="/articlelist"></Route>
          <Route element={<ProfileUpdate />} path="/profileupdate"></Route>
          <Route
            element={<DiagnoseDetail />}
            path="/diagnosedetail/:id"
          ></Route>
          <Route element={<LoginCallback />} path="/oauth/callback"></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
