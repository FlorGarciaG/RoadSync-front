import React, { useState } from "react";
import Modal from "../Modal/Modal";
import MultaCard from "../Multas/MultaCard";
import IncidenteCard from "../Incidentes/IncidenteCard";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const VehicleCard = ({ vehicle, multas = [], incidencias = [], onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleChipClick = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const modalData = modalType === "multas" ? multas : incidencias;

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl border-2 border-[#4C0022] p-6 w-full max-w-md relative transition-transform hover:scale-[1.02]">
        {/* Header: Placa */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-[#4C0022] tracking-wide">
            {vehicle.placa}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(vehicle)}
              className="text-[#4C0022] hover:text-[#6a0040] transition-colors"
              title="Editar"
            >
              <FiEdit size={20} />
            </button>
            <button
              onClick={() => onDelete(vehicle)}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Eliminar"
            >
              <FiTrash2 size={20} />
            </button>
            <button
              onClick={() => handleChipClick("detalles")}
              className="text-[#4C0022] hover:text-[#6a0040] transition-colors"
              title="Ver detalles"
            >
              <FiEye size={20} />
            </button>
          </div>
        </div>

        {/* Chips de Multas e Incidencias */}
        <div className="flex gap-2 mb-4">
          {multas.length > 0 && (
            <button
              onClick={() => handleChipClick("multas")}
              className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold hover:bg-red-200 transition-colors"
              title="Ver multas"
            >
              Multas: {multas.length}
            </button>
          )}
          {incidencias.length > 0 && (
            <button
              onClick={() => handleChipClick("incidencias")}
              className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold hover:bg-yellow-200 transition-colors"
              title="Ver incidencias"
            >
              Incidencias: {incidencias.length}
            </button>
          )}
        </div>

        {/* Detalles básicos del vehículo */}
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold text-[#4C0022]">Tipo:</span>{" "}
            {vehicle.tipo}
          </p>
          <p>
            <span className="font-semibold text-[#4C0022]">Marca:</span>{" "}
            {vehicle.marca}
          </p>
          <p>
            <span className="font-semibold text-[#4C0022]">Modelo:</span>{" "}
            {vehicle.modelo}
          </p>
          <p>
            <span className="font-semibold text-[#4C0022]">Tarjeta:</span>{" "}
            {vehicle.tarjeta}
          </p>
          <p>
            <span className="font-semibold text-[#4C0022]">
              Vencimiento Tarjeta:
            </span>{" "}
            {vehicle.tarjetaVencimiento}
          </p>
          <p>
            <span className="font-semibold text-[#4C0022]">Propietario:</span>{" "}
            {vehicle.propietario
              ? `${vehicle.propietario.nombre} ${vehicle.propietario.apellidos} (${vehicle.propietario.curp})`
              : "Sin propietario"}
          </p>
        </div>
      </div>

      {/* Modal informativo global */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalType === "detalles" ? (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4C0022]">
              Detalles del Vehículo
            </h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold text-[#4C0022]">Placa:</span> {vehicle.placa}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Tipo:</span> {vehicle.tipo}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Marca:</span> {vehicle.marca}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Modelo:</span> {vehicle.modelo}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Tarjeta:</span> {vehicle.tarjeta}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Vencimiento Tarjeta:</span> {vehicle.tarjetaVencimiento}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Número de Serie:</span> {vehicle.numSerie}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Número de Motor:</span> {vehicle.numMotor}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Tipo de Combustible:</span> {vehicle.tipo_combustible}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Año del Auto:</span> {vehicle.anioAuto}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Uso:</span> {vehicle.uso}
              </p>
              <p>
                <span className="font-semibold text-[#4C0022]">Propietario:</span>{" "}
                {vehicle.propietario
                  ? `${vehicle.propietario.nombre} ${vehicle.propietario.apellidos} (${vehicle.propietario.curp})`
                  : "Sin propietario"}
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#4C0022]">
              {modalType === "multas"
                ? "Multas del Vehículo"
                : "Incidencias del Vehículo"}
            </h2>
            {modalData.length === 0 ? (
              <p className="text-gray-500">No hay información disponible.</p>
            ) : (
              <div
                className={
                  modalData.length > 2
                    ? "space-y-4 max-h-72 overflow-y-auto"
                    : "space-y-4"
                }
              >
                {modalType === "multas"
                  ? modalData.map((multa, idx) => (
                      <MultaCard key={multa.id || idx} {...multa} hideActions />
                    ))
                  : modalData.map((inc, idx) => (
                      <IncidenteCard key={inc.id || idx} {...inc} hideActions />
                    ))}
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default VehicleCard;
