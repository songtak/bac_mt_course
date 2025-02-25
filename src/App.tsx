import { Routes, Route } from "react-router-dom";
// import Home from "./pages/HomePage";
// import MountainList from "./pages/MountainListPage";
// import MapView from "./pages/MapViewPage";
import * as PAGES from "./pages/index";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PAGES.HomePage />} />
        <Route path="/list" element={<PAGES.MountainListPage />} />
        <Route path="/map/:mountainName" element={<PAGES.MapViewPage />} />
        <Route path="/sign-up" element={<PAGES.SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
