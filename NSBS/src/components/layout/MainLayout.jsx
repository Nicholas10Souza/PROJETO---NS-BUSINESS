import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useApp } from '../../context/AppContext';
import { Toaster } from 'react-hot-toast';

export const MainLayout = () => {
  const { sidebarCollapsed } = useApp();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col lg:flex-row overflow-x-hidden w-full relative">
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#111827',
            color: '#f8fafc',
            border: '1px solid #374151',
            borderRadius: '16px',
            fontSize: '13px',
            padding: '12px 16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#111827',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#111827',
            },
          },
        }}
      />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 w-full transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Header />

        <main className="flex-1 p-3 sm:p-5 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
