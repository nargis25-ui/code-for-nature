
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import EcoTips from "./pages/EcoTips";
import GreenOptimization from "./pages/GreenOptimization";
import PromptStudio from "./pages/PromptStudio";
import Reward from "./pages/Reward";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eco-tips" element={<EcoTips />} />
        <Route path="/green-optimization" element={<GreenOptimization />} />
        <Route path="/prompt-studio" element={<PromptStudio />} />
        <Route path="/rewards" element={<Reward />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
