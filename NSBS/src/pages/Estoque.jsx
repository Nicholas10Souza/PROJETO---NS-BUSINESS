import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  Search,
  ArrowUpDown,
  RefreshCw,
  Warehouse
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

export const Estoque = () => {
  const { products, updateProductStock, globalSearch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const activeSearch = searchTerm || globalSearch;

  const filteredItems = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          p.sku.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(activeSearch.toLowerCase());
    
    if (statusFilter === 'Alertas') {
      return matchesSearch && (p.status === 'Estoque Baixo' || p.status === 'Crítico');
    }
    if (statusFilter === 'Esgotados') {
      return matchesSearch && p.stock === 0;
    }
    return matchesSearch;
  });

  const totalInventoryValue = products.reduce((acc, p) => acc + (p.stock * p.price), 0);
  const totalCostValue = products.reduce((acc, p) => acc + (p.stock * (p.costPrice || p.price * 0.7)), 0);
  const lowStockCount = products.filter(p => p.status === 'Estoque Baixo' || p.status === 'Crítico').length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Boxes className="w-7 h-7 text-indigo-400" /> Controle de Estoque & Armazenagem
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestão de inventário, alertas de reposição e movimentação de mercadorias.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Warehouse className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Valor de Venda Total</p>
              <h4 className="text-xl font-bold text-white">{formatCurrency(totalInventoryValue)}</h4>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Custo de Estoque</p>
              <h4 className="text-xl font-bold text-white">{formatCurrency(totalCostValue)}</h4>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Itens em Alerta</p>
              <h4 className="text-xl font-bold text-amber-400">{lowStockCount} produtos</h4>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Itens Esgotados</p>
              <h4 className="text-xl font-bold text-rose-400">{outOfStockCount} produtos</h4>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filtrar estoque por produto ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['Todos', 'Alertas', 'Esgotados'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stock Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">Produto / SKU</th>
                <th className="px-5 py-4">Categoria</th>
                <th className="px-5 py-4 text-center">Nível Mínimo</th>
                <th className="px-5 py-4 text-center">Quantidade Atual</th>
                <th className="px-5 py-4">Status de Reposição</th>
                <th className="px-5 py-4 text-right">Ajuste Imediato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-100">{item.name}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{item.sku}</div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-300">
                    {item.category}
                  </td>
                  <td className="px-5 py-4 text-center font-semibold text-slate-400">
                    {item.minStock} un
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-base font-black px-3 py-1 rounded-xl ${
                      item.stock === 0
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : item.stock <= item.minStock
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.stock} un
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {item.stock === 0 ? (
                      <Badge variant="danger">Esgotado</Badge>
                    ) : item.stock <= item.minStock ? (
                      <Badge variant="warning">Reposição Necessária</Badge>
                    ) : (
                      <Badge variant="success">Normal</Badge>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => updateProductStock(item.id, Math.max(0, item.stock - 1))}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Reduzir 1 unidade"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateProductStock(item.id, item.stock + 5)}
                        className="px-2.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold transition-colors cursor-pointer"
                        title="Adicionar lote (+5 un)"
                      >
                        +5 un
                      </button>
                      <button
                        onClick={() => updateProductStock(item.id, item.stock + 1)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Adicionar 1 unidade"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
