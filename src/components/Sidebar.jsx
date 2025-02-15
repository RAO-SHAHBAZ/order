import { useState } from "react";
import { Home, ClipboardList, Settings } from "lucide-react";

const Sidebar = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleNavigation = (tabName) => {
    setActiveTab(tabName);
    setPage(tabName);
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl relative">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-grid-gray-300 opacity-10 pointer-events-none"></div>

      <h2 className="text-xl font-bold text-center py-4">Order Management</h2>
      
      <nav className="mt-4">
        <button
          className={`flex items-center px-4 py-3 w-full text-left ${
            activeTab === "Dashboard" ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
          onClick={() => handleNavigation("Dashboard")}
        >
          <Home className="mr-2" /> Dashboard
        </button>

        <button
          className={`flex items-center px-4 py-3 w-full text-left ${
            activeTab === "Orders" ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
          onClick={() => handleNavigation("Orders")}
        >
          <ClipboardList className="mr-2" /> Orders
        </button>

        <button
          className={`flex items-center px-4 py-3 w-full text-left ${
            activeTab === "Settings" ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
          onClick={() => handleNavigation("Settings")}
        >
          <Settings className="mr-2" /> Settings
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
