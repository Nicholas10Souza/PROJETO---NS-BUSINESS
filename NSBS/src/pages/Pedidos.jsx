import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Building,
  CreditCard,
  X
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

export const Pedidos = () => {
  const { orders, updateOrderStatus, addOrder, globalSearch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    contact: '',
    total: '',
    itemsCount: '1',
    paymentMethod: 'PIX (5% desc)',
  });

  const activeSearch = searchTerm || globalSearch;

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          o.customer.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          o.contact.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || o.shippingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.total) return;
    addOrder({
      customer: formData.customer,
      contact: formData.contact || formData.customer,
      total: parseFloat(formData.total),
      itemsCount: parseInt(formData.itemsCount || 1),
      paymentMethod: formData.paymentMethod,
    });
    setFormData({ customer: '', contact: '', total: '', itemsCount: '1', paymentMethod: 'PIX (5% desc)' });
    setIsModalOpen(false);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Entregue':
        return <Badge variant="success">Entregue</Badge>;
      case 'Enviado':
        return <Badge variant="cyan">Em Trânsito</Badge>;
      case 'Em Separação':
        return <Badge variant="purple">Em Separação</Badge>;
      case 'Pendente':
        return <Badge variant="warning">Pendente</Badge>;
      case 'Cancelado':
        return <Badge variant="danger">Cancelado</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <ShoppingCart className="w-7 h-7 text-indigo-400" /> Central de Pedidos & Faturamento
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhamento em tempo real do processamento, logística e entrega de vendas.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Pedido
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Total de Pedidos</p>
              <h4 className="text-xl font-bold text-white">{orders.length} pedidos</h4>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Em Separação</p>
              <h4 className="text-xl font-bold text-purple-400">
                {orders.filter(o => o.shippingStatus === 'Em Separação').length} pedidos
              </h4>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Em Trânsito</p>
              <h4 className="text-xl font-bold text-cyan-400">
                {orders.filter(o => o.shippingStatus === 'Enviado').length} despachados
              </h4>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Entregues</p>
              <h4 className="text-xl font-bold text-emerald-400">
                {orders.filter(o => o.shippingStatus === 'Entregue').length} concluídos
              </h4>
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
              placeholder="Buscar por Nº do Pedido, Cliente ou Contato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['Todos', 'Em Separação', 'Enviado', 'Entregue', 'Pendente'].map((tab) => (
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

      {/* Orders Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">Nº Pedido</th>
                <th className="px-5 py-4">Cliente / Comprador</th>
                <th className="px-5 py-4">Data</th>
                <th className="px-5 py-4">Valor Total</th>
                <th className="px-5 py-4">Forma de Pagamento</th>
                <th className="px-5 py-4">Status Logístico</th>
                <th className="px-5 py-4 text-right">Alterar Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-indigo-400">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {order.customer}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{order.contact} • {order.itemsCount} itens</div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {order.date}
                  </td>
                  <td className="px-5 py-4 font-black text-slate-100">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 inline-flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {getStatusBadge(order.shippingStatus)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {order.shippingStatus === 'Em Separação' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Enviado')}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5" /> Despachar
                        </button>
                      )}
                      {order.shippingStatus === 'Enviado' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Entregue')}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Entregue
                        </button>
                      )}
                      {order.shippingStatus === 'Pendente' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Em Separação')}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-semibold transition-all cursor-pointer"
                        >
                          Iniciar Separação
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Adicionar Pedido */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-indigo-400" /> Registrar Novo Pedido
            </h3>
            <p className="text-xs text-slate-400 mb-5">Lance uma nova venda com dados de cobrança e entrega.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cliente / Razão Social</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Nexus Logística"
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contato do Comprador</label>
                  <input
                    type="text"
                    placeholder="Ex: Carlos Eduardo"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Qtd de Itens</label>
                  <input
                    type="number"
                    placeholder="1"
                    value={formData.itemsCount}
                    onChange={(e) => setFormData({ ...formData, itemsCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Valor Total (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="11670.00"
                    value={formData.total}
                    onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Condição de Pagamento</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="PIX (5% desc)">PIX (5% desc)</option>
                    <option value="Boleto 30 Dias">Boleto 30 Dias</option>
                    <option value="Cartão de Crédito 3x">Cartão de Crédito 3x</option>
                    <option value="Faturamento 15/30/45">Faturamento 15/30/45</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Criar Pedido
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
