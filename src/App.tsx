import { BrowserRouter, Route, Routes } from "react-router-dom";
import Simulation from "./components/Simulation";
import Game from "./components/Game";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
