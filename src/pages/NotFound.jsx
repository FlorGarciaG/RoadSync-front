import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcf8f8]">
    <h1 className="text-6xl font-bold text-[#B23A48] mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-[#4C0022] mb-2">Página no encontrada</h2>
    <p className="text-gray-600 mb-6">
      Lo sentimos, la ruta que buscas no existe.
    </p>
    <Link
      to="/"
      className="bg-[#4C0022] text-white px-6 py-2 rounded hover:bg-[#6a0040] transition-colors"
    >
      Ir al inicio
    </Link>
  </div>
);

export default NotFound;