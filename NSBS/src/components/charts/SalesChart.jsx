import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingCart, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SalesChart = () => {
  const { salesChartData } = useApp();
  const [activeMetric, setActiveMetric] = useState('receita'); // 'receita', 'pedidos', 'orcamentos'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const metricConfigs = {
    receita: {
      label: 'Faturamento Bruto',
      prefix: 'R$ ',
      format: (v) => `R$ ${(v / 1000).toFixed(1)}k`,
      fullFormat: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v),
      color: 'from-indigo-500 to-indigo-600',
      activeColor: '#6366f1',
      icon: DollarSign,
      maxVal: Math.max(...salesChartData.map(d => d.receita)) * 1.15,
    },
    pedidos: {
      label: 'Volume de Pedidos',
      prefix: '',
      format: (v) => `${v} un`,
      fullFormat: (v) => `${v} pedidos concluídos`,
      color: 'from-emerald-500 to-teal-500',
      activeColor: '#10b981',
      icon: ShoppingCart,
      maxVal: Math.max(...salesChartData.map(d => d.pedidos)) * 1.15,
    },
    orcamentos: {
      label: 'Orçamentos Emitidos',
      prefix: '',
      format: (v) => `${v}`,
      fullFormat: (v) => `${v} orçamentos gerados`,
      color: 'from-amber-500 to-orange-500',
      activeColor: '#f59e0b',
      icon: FileText,
      maxVal: Math.max(...salesChartData.map(d => d.orcamentos)) * 1.15,
    }
  };

  const currentConfig = metricConfigs[activeMetric];
  const maxVal = currentConfig.maxVal;

  return (
    <div className="flex flex-col h-full">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h4 className="text-base font-bold text-slate-100">Desempenho Comercial & Vendas</h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">Comparativo de performance ao longo dos meses de 2026</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          {Object.entries(metricConfigs).map(([key, config]) => {
            const Icon = config.icon;
            const isActive = activeMetric === key;
            return (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {config.label.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Visual Representation */}
      <div className="relative pt-6 pb-2 flex-1 min-h-[220px] flex items-end justify-between gap-2 sm:gap-4 px-2">
        {salesChartData.map((item, index) => {
          const value = item[activeMetric];
          const heightPercent = Math.max(8, (value / maxVal) * 100);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.month}
              className="relative flex-1 flex flex-col items-center group h-full justify-end"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute -top-12 z-20 px-3 py-1.5 rounded-lg glass-dropdown text-xs text-white shadow-xl whitespace-nowrap pointer-events-none"
                >
                  <p className="font-bold text-slate-200">{item.month}/2026</p>
                  <p className="text-indigo-400 font-semibold">{currentConfig.fullFormat(value)}</p>
                </motion.div>
              )}

              {/* Bar */}
              <div className="w-full max-w-[42px] relative flex items-end justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.6, delay: index * 0.03, ease: 'easeOut' }}
                  className={`w-full rounded-t-xl bg-gradient-to-t ${currentConfig.color} transition-all duration-200 relative ${
                    isHovered ? 'brightness-125 shadow-glow' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Subtle highlight line on top */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/40 rounded-t-xl" />
                </motion.div>
              </div>

              {/* Month Label */}
              <span className={`text-[11px] font-medium mt-3 transition-colors ${
                isHovered ? 'text-indigo-400 font-bold' : 'text-slate-400'
              }`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chart Footer summary */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span>Meta atingida: <strong className="text-emerald-400 font-semibold">+18.4%</strong> este trimestre</span>
        </div>
        <span>Total Acumulado: <strong className="text-slate-200">R$ 1.545.920,00</strong></span>
      </div>
    </div>
  );
};
