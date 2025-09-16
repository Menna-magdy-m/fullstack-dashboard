import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/items"
                className={`block py-2 px-4 rounded transition-colors ${
                  location.pathname === '/items' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                📦 Items
              </Link>
            </li>
            <li>
              <Link
                to="/videos"
                className={`block py-2 px-4 rounded transition-colors ${
                  location.pathname === '/videos' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                🎥 Videos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;