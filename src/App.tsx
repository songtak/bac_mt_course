import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MountainList from "./pages/MountainList";
import MapView from "./pages/MapView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<MountainList />} />
      <Route path="/map/:mountainName" element={<MapView />} />
    </Routes>
  );
}

export default App;
