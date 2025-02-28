import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import _ from "lodash";
import * as PAGES from "./pages/index";
import ScrollToTop from "./utils/ScrollToTop";
import GPXExporter from "./pages/GPXExporter";
import useAuth from "./utils/hooks/useAuth";
import useUserStore from "./stores/useUserStore";
import { getUserData } from "./services/userApi";

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
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PAGES.HomePage />} />
        <Route path="/gpx" element={<GPXExporter />} />
        <Route path="/list" element={<PAGES.MountainListPage />} />
        <Route path="/map/:mountainName" element={<PAGES.MapViewPage />} />
        <Route path="/sign-up" element={<PAGES.SignUpPage />} />
        <Route path="/sign-in" element={<PAGES.LoginPage />} />
        <Route path="/my" element={<PAGES.MyPage />} />
      </Routes>
    </>
  );
}

export default App;
