import { Routes, Route } from "react-router-dom";

import * as PAGES from "./pages/index";
import ScrollToTop from "./utils/ScrollToTop";
import GPXExporter from "./pages/GPXExporter";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/gpx" element={<GPXExporter />} />
        <Route path="/" element={<GPXExporter />} />
        {/* <Route path="/" element={<PAGES.HomePage />} /> */}
        <Route path="/list" element={<PAGES.MountainListPage />} />
        <Route path="/map/:mountainName" element={<PAGES.MapViewPage />} />
        <Route path="/sign-up" element={<PAGES.SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
