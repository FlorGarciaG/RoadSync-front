import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Multas from "./pages/problemas-legales/Multas";
import Incidencias from "./pages/problemas-legales/Incidencias";

// Página 404
const NotFound = () => <h1>Ruta no encontrada 404</h1>;

const AppRoutes = ({ userData }) => (
  <Routes>
    <Route path="/" element={<Home user={userData} />} />
    <Route path="/users" element={<Users userData={userData} />} />
    <Route path="/drivers" element={<Drivers />} />
    <Route path="/vehicles" element={<Vehicles />} />
    <Route path="/problemas-legales/multas" element={<Multas />} />
    <Route path="/problemas-legales/incidencias" element={<Incidencias />} />
    <Route path="/inicio" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;