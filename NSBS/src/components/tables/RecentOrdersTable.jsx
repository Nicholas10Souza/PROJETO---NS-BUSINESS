import React from 'react';
import { ShoppingBag, CheckCircle, Clock, Truck, XCircle, ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const RecentOrdersTable = ({ limit = 5 }) => {
  const { orders, updateOrderStatus } = useApp();
  const displayOrders = orders.slice(0, limit);

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

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900/60 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
          <tr>
            <th className="px-4 py-3.5 rounded-l-xl">Nº Pedido</th>
            <th className="px-4 py-3.5">Cliente</th>
            <th className="px-4 py-3.5">Data</th>
            <th className="px-4 py-3.5">Total</th>
            <th className="px-4 py-3.5">Pagamento</th>
            <th className="px-4 py-3.5">Status Logístico</th>
            <th className="px-4 py-3.5 rounded-r-xl text-right">Ação Rápida</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {displayOrders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-800/40 transition-colors group">
              <td className="px-4 py-4 font-mono font-bold text-indigo-400">
                {order.id}
              </td>
              <td className="px-4 py-4">
                <div className="font-semibold text-slate-100">{order.customer}</div>
                <div className="text-xs text-slate-400">{order.contact}</div>
              </td>
              <td className="px-4 py-4 text-xs text-slate-400">
                {new Date(order.date).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-4 py-4 font-bold text-slate-100">
                {formatCurrency(order.total)}
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                  {order.paymentMethod}
                </span>
              </td>
              <td className="px-4 py-4">
                {getStatusBadge(order.shippingStatus)}
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  {order.shippingStatus === 'Em Separação' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Enviado')}
                      title="Marcar como Enviado"
                      className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Despachar</span>
                    </button>
                  )}
                  {order.shippingStatus === 'Enviado' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Entregue')}
                      title="Confirmar Entrega"
                      className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Entregar</span>
                    </button>
                  )}
                  <Link
                    to="/pedidos"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-indigo-400 hover:bg-slate-700 transition-all"
                    title="Ver detalhes"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
