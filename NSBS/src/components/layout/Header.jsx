import React, { useState } from 'react';
import {
  Search,
  Bell,
  PlusCircle,
  Shield,
  User,
  Menu,
  Zap,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { globalSearch, setGlobalSearch, users, setMobileSidebarOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = users[0] || {
    name: 'Nicholas Souza',
    email: 'nicholas@nsbusiness.com.br',
    role: 'CEO & Diretor Executivo',
    avatar: '/nicholas-souza.jpg'
  };

  const notifications = [
    { id: 1, title: 'Novo pedido recebido!', desc: 'Pedido #PED-9081 no valor de R$ 36.900', time: '10 min atrás', unread: true, type: 'order' },
    { id: 2, title: 'Alerta de Estoque Crítico', desc: 'Workstation Extreme com apenas 1 unidade', time: '1h atrás', unread: true, type: 'alert' },
    { id: 3, title: 'Orçamento Aprovado', desc: 'Hospital São Lucas aprovou R$ 142.500', time: '3h atrás', unread: false, type: 'quote' },
  ];

  return (
    <header className="h-16 sticky top-0 z-30 bg-[#0d1322]/90 backdrop-blur-md border-b border-[#1f293d] px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
      {/* Left side: Mobile Hamburger Button & Brand logo */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          title="Abrir Menu"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow shrink-0">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
            NS <span className="text-indigo-400">BUSINESS</span>
          </span>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:block flex-1 max-w-md relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Pesquisar clientes, produtos, pedidos, SKUs..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Action Buttons & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Pesquisar"
          aria-label="Pesquisar"
        >
          {mobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>

        {/* Quick New Action */}
        <Button
          size="sm"
          variant="primary"
          icon={PlusCircle}
          onClick={() => navigate('/pedidos')}
          className="hidden sm:inline-flex"
        >
          Novo Pedido
        </Button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors relative cursor-pointer"
            title="Notificações"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#0d1322]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-dropdown p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="font-bold text-sm text-slate-100">Notificações</span>
                <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline">Marcar lidas</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700 cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/40"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200">{currentUser.name}</span>
              <span className="text-[10px] text-indigo-400 font-medium">Sócio Administrador</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-dropdown p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-200">{currentUser.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={() => { navigate('/usuarios'); setShowUserMenu(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-400" /> Meu Perfil
              </button>
              <button
                onClick={() => { navigate('/configuracoes'); setShowUserMenu(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <Shield className="w-4 h-4 text-slate-400" /> Preferências
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 p-3 bg-[#0d1322] border-b border-[#1f293d] z-20 animate-in slide-in-from-top-2 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Pesquisar clientes, produtos, pedidos..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
};
