export const tipoIncidenciaOptions = [
  { value: "robo", label: "Robo" },
  { value: "simulacion_robo", label: "Simulación de robo" },
  { value: "mercancia_ilegal", label: "Transporte de mercancía ilegal" },
  { value: "accidente", label: "Accidente de tránsito" },
  { value: "clonacion", label: "Clonación de placas" },
  { value: "secuestro", label: "Secuestro vehicular" },
  { value: "uso_no_autorizado", label: "Uso no autorizado" },
  { value: "incidente_legal", label: "Incidente legal" },
  { value: "uso_en_delito", label: "Vehículo utilizado en delito" },
];

export const tipoIncidenciaLabels = tipoIncidenciaOptions.reduce((acc, opt) => {
  acc[opt.value] = opt.label;
  return acc;
}, {});