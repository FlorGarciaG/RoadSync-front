import React, { useEffect, useState } from "react";
import catalogoMultasService from "../services/catalogoMultasService";
import CatalogoForm from "../components/Multas/CatalogoForm";
import Modal from "../components/Modal/Modal";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const initialForm = { tipo: "", monto: "" };

const CatalogoMultas = () => {
  const [multas, setMultas] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchMultas = async () => {
    setLoading(true);
    try {
      const data = await catalogoMultasService.getAll();
      setMultas(Array.isArray(data) ? data : []);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const dataToSend = {
        ...formData,
        monto: parseFloat(formData.monto),
      };
      if (editId) {
        await catalogoMultasService.update(editId, { ...dataToSend, idTipo: editId });
        Swal.fire("Éxito", "Multa actualizada", "success");
      } else {
        await catalogoMultasService.create(dataToSend);
        Swal.fire("Éxito", "Multa agregada", "success");
      }
      setFormData(initialForm);
      setEditId(null);
      setShowModal(false);
      fetchMultas();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (multa) => {
    setEditId(multa.idTipo);
    setFormData({
      tipo: multa.tipo,
      monto: multa.monto,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar multa?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4C0022",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await catalogoMultasService.delete(id);
        fetchMultas();
        Swal.fire("Eliminado", "Multa eliminada", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  return (
    <div className="p-4 bg-[#fcf8f8] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#4C0022]">
        Catálogo de Multas
      </h1>
      <div className="flex justify-between items-center mb-4">
        <button
          className="flex items-center gap-2 bg-[#4C0022] text-white px-4 py-2 rounded hover:bg-[#6a0040] transition-colors"
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setFormData(initialForm);
          }}
        >
          <FaPlus /> Agregar tipo de multa
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditId(null);
          setFormData(initialForm);
        }}
      >
        <CatalogoForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditing={!!editId}
          onCancel={() => {
            setShowModal(false);
            setEditId(null);
            setFormData(initialForm);
          }}
          submitting={submitting}
        />
      </Modal>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-[#4C0022]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <span className="ml-3 text-[#4C0022] font-medium">Cargando...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-[#f3e7e7] text-[#4C0022]">
                <th className="py-2 px-4 text-left">Nombre</th>
                <th className="py-2 px-4 text-left">Monto (MXN)</th>
                <th className="py-2 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {multas.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400">
                    No hay tipos de multa registrados.
                  </td>
                </tr>
              ) : (
                multas.map((multa) => (
                  <tr key={multa.idTipo} className="border-b last:border-b-0">
                    <td className="py-2 px-4">{multa.tipo}</td>
                    <td className="py-2 px-4">
                      ${parseFloat(multa.monto).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(multa)}
                          className="flex items-center gap-1 bg-[#D9B26F] text-[#4C0022] px-3 py-1 rounded hover:bg-[#c3a661] transition-colors"
                          aria-label="Editar multa"
                        >
                          <FiEdit size={16} />
                          <span className="hidden md:inline">Editar</span>
                        </button>
                        <button
                          onClick={() => handleDelete(multa.idTipo)}
                          className="flex items-center gap-1 bg-[#B33A3A] text-white px-3 py-1 rounded hover:bg-[#8b2e2e]"
                        >
                          <FiTrash2 size={16} />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CatalogoMultas;