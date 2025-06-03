import React from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import {
  FaHome,
  FaCar,
  FaUserTie,
  FaExclamationTriangle,
  FaUsers,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ userRole = "user", onLogout, collapsed, toggleSidebar }) => {
  const location = useLocation();

  const baseMenuItems = [
    {
      icon: <FaHome size={20} />,
      text: "Home",
      to: "/",
    },
    {
      icon: <FaCar size={20} />,
      text: "Vehículos",
      to: "/vehicles",
    },
    {
      icon: <FaUserTie size={20} />,
      text: "Propietarios",
      to: "/drivers",
    },
    {
      icon: <FaExclamationTriangle size={20} />,
      text: "Problemas legales",
      subItems: [
        { text: "Multas", to: "/problemas-legales/multas" },
        { text: "Incidencias", to: "/problemas-legales/incidencias" },
      ],
    },
  ];

  const adminMenuItem = {
    icon: <FaUsers size={20} />,
    text: "Usuarios",
    to: "/users",
  };

  const menuItems =
    userRole === "Administrador"
      ? [...baseMenuItems, adminMenuItem]
      : baseMenuItems;

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#fcf8f8] border-r border-[#e7d0d0] h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-5 bg-white border border-[#e7d0d0] rounded-full p-1 shadow-md hover:bg-[#f3e7e7] z-10"
      >
        {collapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
      </button>

      <div className="p-4 flex-1 overflow-hidden">
        <div className="mb-4 flex items-center gap-2">
          <img src="/favicon.ico" alt="favicon" className="w-6 h-6 ml-3" />
          {!collapsed && (
            <h2 className="text-[#4C0022] font-bold text-lg">RoadSync</h2>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              to={item.to}
              subItems={item.subItems || []}
              collapsed={collapsed}
              active={
                location.pathname === item.to ||
                (item.subItems &&
                  item.subItems.some((sub) => location.pathname === sub.to))
              }
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-[#e7d0d0]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f3e7e7]"
        >
          <FaSignOutAlt className="text-[#1b0e0e]" size={20} />
          {!collapsed && (
            <span className="text-[#1b0e0e] text-sm font-medium">
              Cerrar sesión
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
