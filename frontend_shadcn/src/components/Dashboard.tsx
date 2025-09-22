import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import ItemsPage from '../pages/ItemsPage';
import VideosPage from '../pages/VideosPage';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1">
        <Navbar />
        <main className="mt-16 ml-70 p-6">
          <Routes>
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/" element={<ItemsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;