// src/components/Sidebar.tsx
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },
    { label: "Analysis", icon: <BarChart3 size={20} />, href: "/analysis" },
    { label: "Report", icon: <FileText size={20} />, href: "/report" },
  ];

  const bottomItems = [
    { label: "Settings", icon: <Settings size={20} />, href: "/settings" },
    { label: "Logout", icon: <LogOut size={20} />, href: "/logout" },
  ];

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col justify-between transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="text-2xl font-bold px-6 py-4">Nutrient App</div>
          <nav className="flex flex-col space-y-2 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded transition-all ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom menu */}
        <div className="mb-4 px-4">
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center space-x-3 px-4 py-2 rounded transition-all hover:bg-gray-700"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
