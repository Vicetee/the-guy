import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import FindAGuy from "./pages/FindAGuy/FindAGuy.tsx";
import Results from "./pages/Results/Results.tsx";
import WorkerRegister from "./pages/WorkerRegister/WorkerRegister.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<FindAGuy />} />
        <Route path="/results" element={<Results />} />
        <Route path="/register" element={<WorkerRegister />} />
      </Routes>
    </BrowserRouter>
  );
}