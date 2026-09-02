import React, { useState } from 'react';
import {
  UserCheck,
  UserPlus,
  Shield,
  Mail,
  Building,
  CheckCircle2,
  Clock,
  Key,
  X
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

export const Usuarios = () => {
  const { users, addUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Vendedor Sênior',
    department: 'Vendas & Negócios',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addUser({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
    });
    setFormData({ name: '', email: '', role: 'Vendedor Sênior', department: 'Vendas & Negócios' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <UserCheck className="w-7 h-7 text-indigo-400" /> Usuários & Níveis de Acesso
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestão da equipe de operadores, cargos, permissões administrativas e auditoria de acessos.
          </p>
        </div>

        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Membro
        </Button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {users.map((user) => (
          <Card key={user.id} hoverEffect className="flex flex-col justify-between p-5 space-y-4">
            <div className="flex items-start justify-between">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/30"
              />
              <Badge variant={user.status === 'Ativo' ? 'success' : 'default'}>
                {user.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-white line-clamp-1">{user.name}</h3>
              <p className="text-xs font-semibold text-indigo-400 mt-0.5">{user.role}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                <Building className="w-3 h-3 text-slate-500" /> {user.department}
              </p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-slate-500" /> {user.email}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> {user.lastLogin}
              </span>
              <span className="font-mono text-slate-400">{user.id}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Access Permissions Summary */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Key className="w-5 h-5 text-indigo-400" /> Políticas de Permissão & Segurança
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          O sistema utiliza criptografia de ponta a ponta e controle de acessos RBAC baseado em funções corporativas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="font-bold text-indigo-400 block mb-1">Diretoria & Sócios</span>
            <p className="text-slate-400">Acesso total a faturamento, balanços, exclusão e auditoria executiva.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1">Comercial & Vendas</span>
            <p className="text-slate-400">Criação de propostas, cadastro de clientes, envio de pedidos e orçamentos.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="font-bold text-cyan-400 block mb-1">Logística & Estoque</span>
            <p className="text-slate-400">Controle de inventário, separação, despachos e atualização de rastreio.</p>
          </div>
        </div>
      </Card>

      {/* Modal Adicionar Usuário */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 border border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-400" /> Convidar Membro para o Time
            </h3>
            <p className="text-xs text-slate-400 mb-5">Adicione um novo colaborador ao sistema.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gabriel Oliveira"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="gabriel@nsbusiness.com.br"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cargo / Função</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Vendedor Sênior"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Departamento</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Diretoria">Diretoria</option>
                    <option value="Vendas & Negócios">Vendas & Negócios</option>
                    <option value="Operações">Operações</option>
                    <option value="Financeiro">Financeiro</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Enviar Convite
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
