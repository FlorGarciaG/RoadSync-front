import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Multas from "./pages/problemas-legales/Multas";
import Incidencias from "./pages/problemas-legales/Incidencias";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CatalogoMultas from "./pages/CatalogoMultas";

const AppRoutes = ({ userData, authenticated, onLogin }) => (
  <Routes>
    <Route
      path="/login"
      element={
        authenticated ? <Navigate to="/" replace /> : <Login onLogin={onLogin} />
      }
    />
    <Route
      path="/"
      element={
        authenticated ? <Home user={userData} /> : <Navigate to="/login" replace />
      }
    />
    <Route
      path="/users"
      element={
        authenticated ? <Users userData={userData} /> : <Navigate to="/login" replace />
      }
    />
    <Route
      path="/drivers"
      element={authenticated ? <Drivers /> : <Navigate to="/login" replace />}
    />
    <Route
      path="/vehicles"
      element={authenticated ? <Vehicles /> : <Navigate to="/login" replace />}
    />
    <Route
      path="/problemas-legales/multas"
      element={authenticated ? <Multas /> : <Navigate to="/login" replace />}
    />
    <Route
      path="/problemas-legales/incidencias"
      element={authenticated ? <Incidencias /> : <Navigate to="/login" replace />}
    />
    <Route
      path="/catalogo-multas"
      element={authenticated ? <CatalogoMultas /> : <Navigate to="/login" replace />}
    />
    <Route path="/inicio" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;