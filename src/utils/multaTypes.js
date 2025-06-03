export const tipoMultaOptions = [
  { value: "exceso_velocidad", label: "Exceso de velocidad" },
  { value: "estacionamiento_prohibido", label: "Estacionamiento prohibido" },
  { value: "sin_licencia", label: "No portar licencia de conducir" },
  { value: "alcohol_drogas", label: "Conducir bajo efectos del alcohol/drogas" },
  { value: "sin_cinturon", label: "No usar cinturón de seguridad" },
  { value: "uso_celular", label: "Uso de teléfono móvil al volante" },
  { value: "no_respetar_senales", label: "No respetar señales de tránsito" },
  { value: "placa_vencida", label: "Placa vencida o no visible" },
  { value: "transporte_ilegal", label: "Transporte ilegal de pasajeros" },
  { value: "sin_documentos", label: "No portar documentos del vehículo" },
];

export const tipoMultaLabels = tipoMultaOptions.reduce((acc, opt) => {
  acc[opt.value] = opt.label;
  return acc;
}, {});