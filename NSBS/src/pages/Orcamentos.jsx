import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Calendar,
  DollarSign,
  Building,
  UserCheck,
  X,
  FileCheck
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

export const Orcamentos = () => {
  const { quotes, updateQuoteStatus, addQuote, globalSearch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    responsible: '',
    total: '',
    itemsCount: '1',
    validUntil: '2026-09-20',
  });

  const activeSearch = searchTerm || globalSearch;

  const filteredQuotes = quotes.filter(q =>
    q.client.toLowerCase().includes(activeSearch.toLowerCase()) ||
    q.responsible.toLowerCase().includes(activeSearch.toLowerCase()) ||
    q.id.toLowerCase().includes(activeSearch.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client || !formData.total) return;
    addQuote({
      client: formData.client,
      responsible: formData.responsible || 'Nicholas Souza',
      total: parseFloat(formData.total),
      itemsCount: parseInt(formData.itemsCount || 1),
      validUntil: formData.validUntil,
    });
    setFormData({ client: '', responsible: '', total: '', itemsCount: '1', validUntil: '2026-09-20' });
    setIsModalOpen(false);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const getQuoteStatusBadge = (status) => {
    switch (status) {
      case 'Aprovado':
        return <Badge variant="success">Aprovado</Badge>;
      case 'Faturado':
        return <Badge variant="purple">Faturado</Badge>;
      case 'Em Análise':
        return <Badge variant="cyan">Em Análise</Badge>;
      case 'Pendente':
        return <Badge variant="warning">Pendente</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const totalInPipeline = quotes.reduce((acc, q) => acc + q.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileSpreadsheet className="w-7 h-7 text-indigo-400" /> Propostas & Orçamentos Comerciais
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pipeline de negociações B2B, emissão de propostas e conversão em pedidos.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Orçamento
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total em Negociação</p>
            <h4 className="text-xl font-bold text-white">{formatCurrency(totalInPipeline)}</h4>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Orçamentos Aprovados</p>
            <h4 className="text-xl font-bold text-emerald-400">
              {quotes.filter(q => q.status === 'Aprovado' || q.status === 'Faturado').length} propostas
            </h4>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Pendentes de Retorno</p>
            <h4 className="text-xl font-bold text-amber-400">
              {quotes.filter(q => q.status === 'Pendente' || q.status === 'Em Análise').length} aguardando
            </h4>
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Pesquisar por cliente, responsável ou código da proposta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </Card>

      {/* Quotes Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">Código / Data</th>
                <th className="px-5 py-4">Cliente / Solicitante</th>
                <th className="px-5 py-4">Valor Total</th>
                <th className="px-5 py-4">Validade</th>
                <th className="px-5 py-4">Probabilidade</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-mono font-bold text-indigo-400">{quote.id}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{quote.date}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {quote.client}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{quote.responsible} • {quote.itemsCount} itens</div>
                  </td>
                  <td className="px-5 py-4 font-black text-slate-100">
                    {formatCurrency(quote.total)}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {quote.validUntil}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {quote.probability}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {getQuoteStatusBadge(quote.status)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {quote.status !== 'Aprovado' && quote.status !== 'Faturado' && (
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'Aprovado')}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer"
                        >
                          Aprovar
                        </button>
                      )}
                      {quote.status === 'Aprovado' && (
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'Faturado')}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-semibold transition-all cursor-pointer"
                        >
                          Faturar Pedido
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

      {/* Modal Adicionar Orçamento */}
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
              <FileSpreadsheet className="w-5 h-5 text-indigo-400" /> Criar Novo Orçamento B2B
            </h3>
            <p className="text-xs text-slate-400 mb-5">Elabore uma proposta comercial para negociação.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cliente / Razão Social</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Hospital Regional São Lucas"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Responsável / Vendedor</label>
                  <input
                    type="text"
                    placeholder="Nicholas Souza"
                    value={formData.responsible}
                    onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
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
                    placeholder="142500.00"
                    value={formData.total}
                    onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Válido Até</label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Gerar Proposta
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
