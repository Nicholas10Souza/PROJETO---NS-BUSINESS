import React, { useState } from 'react';
import {
  Settings,
  Save,
  Building2,
  Shield,
  Bell,
  DollarSign,
  Palette,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export const Configuracoes = () => {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState({ ...settings });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-indigo-400" /> Configurações & Parâmetros do Sistema
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalize informações da empresa, emissão fiscal, taxas e preferências globais.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Save}
          onClick={handleSubmit}
        >
          Salvar Alterações
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Dados da Empresa */}
        <Card>
          <CardHeader
            title="Dados Cadastrais da Empresa"
            subtitle="Informações que constarão em orçamentos, faturas e relatórios oficiais"
            icon={Building2}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Razão Social</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Fantasia</label>
              <input
                type="text"
                value={formData.tradingName}
                onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">CNPJ</label>
              <input
                type="text"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Inscrição Estadual (IE)</label>
              <input
                type="text"
                value={formData.ie}
                onChange={(e) => setFormData({ ...formData, ie: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Principal</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / Central</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Endereço Comercial</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Parâmetros Fiscais & Financeiros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Financeiro & Impostos"
              subtitle="Moeda padrão e alíquota de faturamento"
              icon={DollarSign}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Moeda Principal</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="BRL (R$)">Real Brasileiro - BRL (R$)</option>
                  <option value="USD ($)">Dólar Americano - USD ($)</option>
                  <option value="EUR (€)">Euro - EUR (€)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Alíquota Média de Impostos (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoInvoice}
                    onChange={(e) => setFormData({ ...formData, autoInvoice: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
                  />
                  <span className="text-xs text-slate-300">
                    Gerar faturamento fiscal automático ao aprovar orçamento
                  </span>
                </label>
              </div>
            </div>
          </Card>

          {/* Section 3: Notificações & Sistema */}
          <Card>
            <CardHeader
              title="Notificações & Interface"
              subtitle="Alertas automáticos e temas"
              icon={Bell}
            />
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Notificações por E-mail</span>
                  <span className="text-[11px] text-slate-400">Receba resumos diários de faturamento e estoque baixo.</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Dark Mode Pro Exclusivo</span>
                  <span className="text-[11px] text-slate-400">Interface em alta definição com paleta escura otimizada.</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.darkMode}
                  onChange={(e) => setFormData({ ...formData, darkMode: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
                />
              </label>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Backup em nuvem automático sincronizado a cada 1 hora.</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" icon={Save}>
            Salvar Todas as Configurações
          </Button>
        </div>
      </form>
    </div>
  );
};
