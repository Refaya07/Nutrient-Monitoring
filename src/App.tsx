import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/AnalysisPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
