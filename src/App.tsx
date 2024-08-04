import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/Game";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
