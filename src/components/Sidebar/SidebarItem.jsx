import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const SidebarItem = ({ icon, text, to = "#", active = false, collapsed = false, subItems = [] }) => {
  const location = useLocation();
  const hasSubItems = subItems.length > 0;
  const isParentActive = subItems.some((item) => location.pathname === item.to);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isParentActive) setOpen(true);
  }, [isParentActive]);

  const handleToggle = () => {
    if (hasSubItems) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="w-full">
      {hasSubItems ? (
        // Caso con subitems (Multas/Incidencias)
        <div
          onClick={handleToggle}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer
            ${(active || isParentActive) ? 'bg-[#f3e7e7]' : 'hover:bg-[#f3e7e7]/50'} 
            ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? text : ''}
        >
          <div className="text-[#1b0e0e]">{icon}</div>
          {!collapsed && (
            <>
              <p className="flex-1 text-[#1b0e0e] text-sm font-medium">{text}</p>
              <div className="text-xs text-[#1b0e0e]">
                {open ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </>
          )}
        </div>
      ) : (
        // Caso normal sin subitems (Link directo)
        <Link
          to={to}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
            ${active ? 'bg-[#f3e7e7]' : 'hover:bg-[#f3e7e7]/50'} 
            ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? text : ''}
        >
          <div className="text-[#1b0e0e]">{icon}</div>
          {!collapsed && (
            <p className="text-[#1b0e0e] text-sm font-medium">{text}</p>
          )}
        </Link>
      )}

      {/* Subitems desplegables */}
      {!collapsed && open && hasSubItems && (
        <div className="ml-6 mt-1 flex flex-col gap-1">
          {subItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`text-sm py-1 px-2 rounded hover:bg-[#f3e7e7]/60 
                ${location.pathname === item.to ? 'bg-[#f3e7e7] text-[#1b0e0e] font-medium' : 'text-[#1b0e0e]'}`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
