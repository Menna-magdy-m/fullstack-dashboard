import React from 'react';
import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import ItemsPage from '../pages/ItemsPage';
import VideosPage from '../pages/VideosPage';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Routes>
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/" element={<ItemsPage />} /> {/* Default page */}
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;