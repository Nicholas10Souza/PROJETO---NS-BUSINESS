import React from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  FileCheck2,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  PackageCheck,
  Building2,
  Plus
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SalesChart } from '../components/charts/SalesChart';
import { RecentOrdersTable } from '../components/tables/RecentOrdersTable';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { metrics, products, quotes, orders } = useApp();
  const navigate = useNavigate();

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const topProducts = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/80 via-slate-900 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-glass">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Painel Executivo NS BUSINESS 2026
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bem-vindo ao Centro de Comando, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Sócio</span>!
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monitore faturamento em tempo real, fluxo de pedidos, estoque automatizado e pipelines de orçamentos com total precisão.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              icon={FileCheck2}
              onClick={() => navigate('/orcamentos')}
            >
              Novo Orçamento
            </Button>
            <Button
              variant="emerald"
              icon={Plus}
              onClick={() => navigate('/produtos')}
            >
              Adicionar Produto
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Faturamento */}
        <Card hoverEffect className="border-l-4 border-l-indigo-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Receita Mensal</p>
              <h3 className="text-2xl font-bold text-white mt-1.5">{formatCurrency(metrics.monthlyRevenue)}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +{metrics.revenueGrowth}%
            </span>
            <span className="text-slate-400">vs. mês anterior</span>
          </div>
        </Card>

        {/* KPI 2: Pedidos */}
        <Card hoverEffect className="border-l-4 border-l-emerald-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total de Pedidos</p>
              <h3 className="text-2xl font-bold text-white mt-1.5">{metrics.totalOrders}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +{metrics.ordersGrowth}%
            </span>
            <span className="text-slate-400">conversão recorde</span>
          </div>
        </Card>

        {/* KPI 3: Clientes Ativos */}
        <Card hoverEffect className="border-l-4 border-l-cyan-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Clientes Ativos</p>
              <h3 className="text-2xl font-bold text-white mt-1.5">{metrics.activeClients}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center text-cyan-400 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +{metrics.clientsGrowth}%
            </span>
            <span className="text-slate-400">novas contas B2B</span>
          </div>
        </Card>

        {/* KPI 4: Ticket Médio */}
        <Card hoverEffect className="border-l-4 border-l-amber-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ticket Médio</p>
              <h3 className="text-2xl font-bold text-white mt-1.5">{formatCurrency(metrics.averageTicket)}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center text-amber-400 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +{metrics.ticketGrowth}%
            </span>
            <span className="text-slate-400">por transação</span>
          </div>
        </Card>
      </div>

      {/* Main Charts and Top Selling Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart (2 cols) */}
        <Card className="lg:col-span-2">
          <SalesChart />
        </Card>

        {/* Top Selling Products (1 col) */}
        <Card>
          <CardHeader
            title="Mais Vendidos"
            subtitle="Produtos com maior tração"
            icon={PackageCheck}
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/produtos')}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Ver todos
              </Button>
            }
          />
          <div className="space-y-4">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{p.name}</h4>
                    <p className="text-[11px] text-slate-400">{p.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-100">{formatCurrency(p.price)}</span>
                  <p className="text-[10px] text-emerald-400 font-semibold">{p.salesCount} vendas</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <Card>
        <CardHeader
          title="Pedidos Recentes"
          subtitle="Últimas movimentações de vendas no sistema"
          icon={ShoppingCart}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/pedidos')}
              className="text-xs"
            >
              Gerenciar Todos ({orders.length})
            </Button>
          }
        />
        <RecentOrdersTable limit={5} />
      </Card>
    </div>
  );
};
