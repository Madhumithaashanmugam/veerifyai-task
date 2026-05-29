import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Employee from "./pages/Employee";
import FinanceReviewer from "./pages/FinanceReviewer";
import FinanceController from "./pages/FinanceController";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/finance-reviewer" element={<FinanceReviewer />} />
        <Route path="/finance-controller" element={<FinanceController />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;