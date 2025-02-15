import { useState } from "react";
import { Home, ClipboardList, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: Home },
  { name: "Orders", icon: ClipboardList },
  { name: "Settings", icon: Settings },
];

const Sidebar = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleNavigation = (tabName) => {
    setActiveTab(tabName);
    setPage(tabName);
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 shadow-xl relative">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-grid-gray-300 opacity-10 pointer-events-none"></div>

      <h2 className="text-xl font-bold text-center py-4">Order Management</h2>

      <nav className="mt-4 space-y-2" role="navigation" aria-label="Sidebar Navigation">
        {navItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`flex items-center px-4 py-3 w-full text-left transition-all rounded-md ${
              activeTab === name ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleNavigation(name)}
          >
            <Icon className="mr-2" /> {name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
