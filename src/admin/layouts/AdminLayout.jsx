import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <AdminSidebar />
      <main className="pt-16 pl-64 w-screen">
        <div className="w-full min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
