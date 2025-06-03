import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./Routes";
import { AuthService } from "./services/authService";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("userData");
      if (user) {
        setUserData(JSON.parse(user));
        setAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const result = await AuthService.login({
        correo: loginData.email,
        password: loginData.password,
      });
      // console.log("Resultado del login:", result);
      if (result.success) {
        setUserData(result.data);
        setAuthenticated(true);
        localStorage.setItem("userData", JSON.stringify(result.data));
        navigate("/");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setAuthenticated(false);
    setUserData(null);
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fcf8f8]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4C0022]"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-[#fcf8f8] min-h-screen">
      <Sidebar
        userRole={userData?.rol || "Administrador"}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        userData={userData}
      />

      <div
        className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <AppRoutes userData={userData} />
      </div>
    </div>
  );
}

export default App;
