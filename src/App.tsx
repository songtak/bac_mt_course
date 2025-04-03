import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import _ from "lodash";
import * as PAGES from "./pages/index";
import ScrollToTop from "./utils/ScrollToTop";
import GPXExporter from "./pages/GPXExporter";
import useAuth from "./utils/hooks/useAuth";
import useUserStore from "./stores/useUserStore";
import { getUserData } from "./services/userApi";
import AddressSettingPage from "./pages/AddressSettingPage";
import ExcelUploader from "./pages/ExcelUploader";
import usePreviousLocation from "./utils/hooks/usePreviousLocation";
import useCommonStore from "./stores/useCommonStore";
import "./assets/common.css";
import CommonLayout from "./components/CommonLayout";
import * as MYPAGE from "./pages/myInfo";
import * as AUTH from "./pages/auth";

function App() {
  const user = useAuth();
  const userStore = useUserStore();
  const previousLocation = usePreviousLocation();
  const commonStore = useCommonStore();

  useEffect(() => {
    if (!_.isNull(user)) {
      userStore.setIsLogin(true);
      getUserData();
    }
  }, [user]);

  useEffect(() => {
    return () => {
      commonStore.setPrevLocation(previousLocation);
    };
  }, [previousLocation]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<PAGES.MainPage />} />
          <Route path="/my-location" element={<PAGES.MyLocationPage />} />
          <Route path="/bookmark" element={<PAGES.BookmarkPage />} />
          <Route path="/my-info" element={<PAGES.MyInfoPage />} />
        </Route>
        <Route path="/search" element={<PAGES.SearchPage />} />
        {/* auth */}
        <Route path="/login" element={<AUTH.LoginPage />} />
        <Route path="/login/:loginType" element={<AUTH.LoginPage />} />
        <Route path="/sign-up" element={<AUTH.SignUpPage />} />
        <Route path="/welcome" element={<AUTH.WelcomePage />} />

        {/*  */}
        <Route path="/gpx" element={<GPXExporter />} />
        <Route path="/list" element={<PAGES.MountainListPage />} />
        <Route path="/map-detail/:mountainId" element={<PAGES.MapViewPage />} />
        <Route path="/map" element={<PAGES.MapPage />} />
        <Route path="/my" element={<PAGES.MyPage />} />
        <Route path="/rank" element={<PAGES.RankingPage />} />
        <Route path="/map-marker" element={<PAGES.MarkerMapPage />} />
        {/* <Route path="/" element={<ExcelUploader />} /> */}
        {/* <Route path="/" element={<PAGES.MainPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
