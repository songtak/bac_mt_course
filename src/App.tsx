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
import "./assets/common.css";

function App() {
  const user = useAuth();
  const userStore = useUserStore();

  useEffect(() => {
    if (!_.isNull(user)) {
      userStore.setIsLogin(true);
      getUserData();
    }
  }, [user]);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* <Route path="/" element={<ExcelUploader />} /> */}
        <Route path="/" element={<PAGES.HomePage />} />
        <Route path="/gpx" element={<GPXExporter />} />
        <Route path="/list" element={<PAGES.MountainListPage />} />
        <Route path="/map-detail/:mountainId" element={<PAGES.MapViewPage />} />
        <Route path="/map" element={<PAGES.MapPage />} />
        <Route path="/sign-up" element={<PAGES.SignUpPage />} />
        <Route path="/sign-in" element={<PAGES.LoginPage />} />
        <Route path="/my" element={<PAGES.MyPage />} />
        <Route path="/rank" element={<PAGES.RankingPage />} />
        <Route path="/map-marker" element={<PAGES.MarkerMapPage />} />
      </Routes>
    </div>
  );
}

export default App;
