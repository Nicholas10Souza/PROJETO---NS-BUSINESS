import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Layers,
  Boxes,
  FileSpreadsheet,
  ShoppingCart,
  UserCheck,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    metrics,
    orders,
    quotes
  } = useApp();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Clientes', path: '/clientes', icon: Users, count: 5 },
    { name: 'Produtos', path: '/produtos', icon: Package },
    { name: 'Categorias', path: '/categorias', icon: Layers },
    { name: 'Estoque', path: '/estoque', icon: Boxes, badge: metrics.lowStockAlerts > 0 ? `${metrics.lowStockAlerts} alertas` : null, badgeColor: 'bg-amber-500/20 text-amber-400' },
    { name: 'Orçamentos', path: '/orcamentos', icon: FileSpreadsheet, badge: `${quotes.length}`, badgeColor: 'bg-indigo-500/20 text-indigo-400' },
    { name: 'Pedidos', path: '/pedidos', icon: ShoppingCart, badge: `${orders.length}`, badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { name: 'Usuários', path: '/usuarios', icon: UserCheck },
    { name: 'Configurações', path: '/configuracoes', icon: Settings },
    { name: 'Relatório Executivo', path: '/relatorio', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out bg-[#0d1322] border-r border-[#1f293d] flex flex-col ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          sidebarCollapsed ? 'w-64 lg:w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1f293d]">
          <NavLink
            to="/"
            onClick={() => setMobileSidebarOpen(false)}
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow shrink-0">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                  NS <span className="text-indigo-400">BUSINESS</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Tech Enterprise</span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className={`px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 ${sidebarCollapsed ? 'lg:hidden' : 'block'}`}>
            Menu Principal
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                
                {(!sidebarCollapsed || mobileSidebarOpen) && (
                  <span className="flex-1 truncate">{item.name}</span>
                )}

                {(!sidebarCollapsed || mobileSidebarOpen) && item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state on desktop */}
                {sidebarCollapsed && (
                  <div className="hidden lg:block fixed left-20 ml-2 px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Pro Banner / Footer */}
        {(!sidebarCollapsed || mobileSidebarOpen) ? (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1 text-indigo-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>NS Pro v2.6 Tech</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
              Ambiente sincronizado em tempo real.
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
              <span>2026 Ready</span>
            </div>
          </div>
        ) : (
          <div className="p-3 flex justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" title="Sistema Online" />
          </div>
        )}
      </aside>
    </>
  );
};
