import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Phone,
  Mail,
  MapPin,
  Building,
  DollarSign,
  Trash2,
  CheckCircle2,
  Filter,
  X
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

export const Clientes = () => {
  const { clients, addClient, deleteClient, globalSearch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: 'São Paulo - SP',
    document: '',
  });

  const activeSearch = searchTerm || globalSearch;

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
    c.company.toLowerCase().includes(activeSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(activeSearch.toLowerCase()) ||
    c.document.includes(activeSearch)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addClient(formData);
    setFormData({ name: '', company: '', email: '', phone: '', city: 'São Paulo - SP', document: '' });
    setIsModalOpen(false);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-indigo-400" /> Gestão de Clientes & Contas B2B
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gerencie carteira de clientes, histórico de compras e dados cadastrais.
          </p>
        </div>

        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Cliente
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total de Clientes</p>
            <h4 className="text-xl font-bold text-white">{clients.length} cadastrados</h4>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Clientes Ativos</p>
            <h4 className="text-xl font-bold text-emerald-400">{clients.filter(c => c.status === 'Ativo').length} ativos</h4>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">LTV Acumulado</p>
            <h4 className="text-xl font-bold text-white">
              {formatCurrency(clients.reduce((acc, c) => acc + c.totalSpent, 0))}
            </h4>
          </div>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filtrar por nome, empresa, e-mail ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-xs font-semibold text-slate-400 px-2 shrink-0">
            {filteredClients.length} encontrados
          </span>
        </div>
      </Card>

      {/* Clients Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">ID / Razão Social</th>
                <th className="px-5 py-4">Contato / E-mail</th>
                <th className="px-5 py-4">Telefone / Local</th>
                <th className="px-5 py-4">Compras / Pedidos</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-100 flex items-center gap-2">
                      <Building className="w-4 h-4 text-indigo-400 shrink-0" />
                      {client.company}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{client.id} • CNPJ: {client.document}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-200">{client.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400" /> {client.email}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-xs text-slate-300 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3 h-3 text-emerald-400" /> {client.phone}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {client.city}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-100">{formatCurrency(client.totalSpent)}</div>
                    <div className="text-xs text-slate-400">{client.ordersCount} pedidos realizados</div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={client.status === 'Ativo' ? 'success' : 'default'}>
                      {client.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
                      title="Excluir cliente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Cadastro de Cliente */}
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
              <UserPlus className="w-5 h-5 text-indigo-400" /> Cadastrar Novo Cliente B2B
            </h3>
            <p className="text-xs text-slate-400 mb-5">Preencha os dados da empresa e contato principal.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Razão Social / Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Magna Tech Soluções Corporativas"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Contato</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CNPJ / CPF</label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={formData.document}
                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Comercial</label>
                  <input
                    type="email"
                    required
                    placeholder="contato@empresa.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cidade / Estado</label>
                <input
                  type="text"
                  placeholder="São Paulo - SP"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Salvar Cliente
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
