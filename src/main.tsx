import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import Sidebar from "./layouts/Sidebar/Sidebar";
import Anggota from "./pages/Anggota/Anggota";
import Dashboard from "./pages/Dashboard/Dashboard";
import AnggotaInput from "./pages/AnggotaInput/AnggotaInput";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/anggota" element={<Anggota />} />
          <Route path="/anggota-input" element={<AnggotaInput />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
