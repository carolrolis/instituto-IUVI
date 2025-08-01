import React from 'react';
import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;