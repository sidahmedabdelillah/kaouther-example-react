import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./screens/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
