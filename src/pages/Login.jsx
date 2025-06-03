import React, { useState } from "react";
import { AuthService } from "../services/authService";
import { TbEye, TbEyeOff } from "react-icons/tb";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const success = await onLogin({ email, password });
    if (!success) {
      setError("Correo o contraseña incorrectos.");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f9f3d7] font-[Inter,'Noto Sans',sans-serif] overflow-x-hidden">
      <div className="flex flex-1 justify-center items-center px-10 py-5">
        <div className="w-full max-w-[512px] bg-white rounded-2xl shadow-lg overflow-hidden border border-[#D9B26F]">
          <div
            className="relative h-48 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: 'url("/login.png")' }}
          >
            <div className="absolute inset-0 bg-[#4C0022]/65"></div>
            <h1 className="absolute bottom-6 left-8 text-[#F2E29F] text-4xl font-bold">
              RoadSync
            </h1>
          </div>

          <div className="p-8">
            <h1 className="text-[#6d2244] text-2xl font-bold text-center mb-6">
              Inicia sesión
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-[#4C0022] text-sm font-semibold mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 py-2 border border-[#D9B26F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D0A3D] focus:border-transparent text-base font-normal placeholder:text-[#D9B26F]"
                  placeholder="correo@gmail.com"
                  required
                />
              </div>

              <div className="mb-8">
                <label
                  className="block text-[#4C0022] text-sm font-semibold mb-2"
                  htmlFor="toggle-password-label"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="toggle-password-label"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 py-2 border border-[#D9B26F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D0A3D] focus:border-transparent text-base font-normal placeholder:text-[#D9B26F] pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    aria-label="password toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#7D0A3D]"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <TbEye size={22} />
                    ) : (
                      <TbEyeOff size={22} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 bg-gradient-to-r from-[#4C0022] to-[#7D0A3D] hover:from-[#7D0A3D] hover:to-[#4C0022] text-[#F2E29F] font-bold rounded-lg transition-all shadow-md hover:shadow-lg ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Acceder"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
