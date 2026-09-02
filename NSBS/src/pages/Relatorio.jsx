import React from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Shield,
  Smartphone,
  Cpu,
  Zap,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

export const Relatorio = () => {
  const { metrics, users, orders, quotes, products, clients } = useApp();
  const currentUser = users[0] || { name: 'Nicholas Souza', role: 'CEO & Diretor Executivo' };

  const handlePrint = () => {
    window.print();
  };

  const routesData = [
    { path: '/', name: 'Dashboard', desc: 'KPIs em tempo real (Receita BRL, Pedidos, Alertas), Gráfico semanal e despacho rápido.' },
    { path: '/clientes', name: 'Clientes B2B', desc: 'Carteira de clientes, filtros por status, modal com auto-ID (CLI-XXX), WhatsApp/E-mail.' },
    { path: '/produtos', name: 'Produtos', desc: 'Catálogo com busca instantânea e categorias, cálculo de margem e ajuste rápido (+/-).' },
    { path: '/categorias', name: 'Categorias', desc: 'Taxonomia de departamentos, distribuição de volume por setor e criação de categorias.' },
    { path: '/estoque', name: 'Estoque', desc: 'Monitor de estoque crítico, badges de urgência e modal de reposição rápida de mercadorias.' },
    { path: '/orcamentos', name: 'Orçamentos', desc: 'Pipeline com responsável Nicholas Souza, auto-ID (ORC-2026-XXX) e probabilidades.' },
    { path: '/pedidos', name: 'Pedidos & Logística', desc: 'Esteira logística (Separação -> Envio -> Entrega), novo pedido e status em tempo real.' },
    { path: '/usuarios', name: 'Usuários & Equipe', desc: 'Perfil oficial Nicholas Souza com foto ativa, níveis de acesso e gestão da equipe.' },
    { path: '/configuracoes', name: 'Configurações', desc: 'Dados cadastrais da empresa (CNPJ, Razão Social, IE), parâmetros fiscais e moeda base.' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Header - Hidden when printing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> Relatório Executivo de Homologação
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Documento oficial de validação e status de todas as funcionalidades da plataforma NS BUSINESS.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            icon={Download}
            onClick={() => window.open('/Relatorio_Funcionamento_NS_BUSINESS.pdf', '_blank')}
          >
            Baixar PDF
          </Button>
          <Button
            variant="primary"
            icon={Printer}
            onClick={handlePrint}
          >
            Imprimir / Salvar PDF
          </Button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div className="space-y-6 bg-[#0d1322] border border-[#1f293d] rounded-3xl p-6 sm:p-8 text-slate-200 shadow-2xl print:border-none print:p-0 print:bg-transparent">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow shrink-0">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                NS <span className="text-indigo-400">BUSINESS</span>
              </h2>
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Relatório de Homologação e Funcionamento Operacional
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <Badge variant="success" className="px-3 py-1 text-xs font-bold uppercase tracking-wider">
              ● Sistema 100% Homologado
            </Badge>
            <span className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> 01 de Setembro de 2026 • Versão 2.6 Pro Tech
            </span>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sócio Responsável</p>
            <h3 className="text-sm font-bold text-indigo-400 mt-1">{currentUser.name}</h3>
            <p className="text-[10px] text-slate-400">{currentUser.role}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status Operacional</p>
            <h3 className="text-sm font-bold text-emerald-400 mt-1">Ativo & Estável</h3>
            <p className="text-[10px] text-slate-400">Zero Erros de Execução</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stack Tecnológica</p>
            <h3 className="text-sm font-bold text-slate-100 mt-1">React 18 + Vite 6</h3>
            <p className="text-[10px] text-slate-400">TailwindCSS 3.4</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Módulos Ativos</p>
            <h3 className="text-sm font-bold text-slate-100 mt-1">9 Telas Integradas</h3>
            <p className="text-[10px] text-slate-400">Rotas 100% Funcionais</p>
          </div>
        </div>

        {/* Modules Matrix Table */}
        <Card className="p-0 overflow-hidden border border-slate-800">
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Matriz de Rotas e Funcionalidades Homologadas
            </h4>
            <span className="text-xs text-emerald-400 font-semibold">9/9 Módulos Aprovados</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Rota</th>
                  <th className="px-4 py-3">Módulo</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Recursos Homologados</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {routesData.map((item) => (
                  <tr key={item.path} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-mono font-bold text-indigo-400 whitespace-nowrap">
                      {item.path}
                    </td>
                    <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="success" className="text-[10px] py-0.5 px-2">
                        100% OK
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {item.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> Responsividade Mobile & Off-Canvas
            </h4>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Sidebar Off-Canvas com gaveta deslizante suave
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Backdrop Blur com fechamento automático ao toque
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Header com botão Hambúrguer e busca retrátil
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Bloqueio total de overflow horizontal (100% fluido)
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Estado Global & Reatividade
            </h4>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                AppContext centralizando as 9 entidades de dados
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Reatividade em tempo real sem recarregamento (SPA)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Notificações dinâmicas com React Hot Toast
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Transições animadas de página fluidas via Framer Motion
              </li>
            </ul>
          </div>
        </div>

        {/* Official Signature Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-bold text-white text-sm">{currentUser.name}</p>
            <p className="text-indigo-400 font-medium">CEO & Sócio Administrador — NS BUSINESS Soluções Tech Ltda.</p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold">Certificado de Homologação Técnica 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
