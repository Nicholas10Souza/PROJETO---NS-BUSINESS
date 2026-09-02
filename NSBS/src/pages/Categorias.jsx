import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Package,
  FolderPlus,
  Cpu,
  Network,
  ShieldCheck,
  Cloud,
  ArrowRight,
  X
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const Categorias = () => {
  const { categories, products, addCategory } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const iconMap = {
    Cpu: Cpu,
    Network: Network,
    ShieldCheck: ShieldCheck,
    Cloud: Cloud,
    Layers: Layers,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addCategory({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description || 'Categoria de produtos cadastrada no sistema.',
    });
    setFormData({ name: '', description: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-indigo-400" /> Categorias & Departamentos
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize a taxonomia de produtos, departamentos e linhas de suprimentos.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Nova Categoria
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Layers;
          const matchingProductsCount = products.filter(p => p.category === cat.name).length;

          return (
            <Card key={cat.id} hoverEffect className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${cat.color} text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400 px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    {cat.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                  <Package className="w-4 h-4" /> {matchingProductsCount} produtos ativos
                </span>

                <Link
                  to="/produtos"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white group"
                >
                  Ver itens <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal Adicionar Categoria */}
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
              <FolderPlus className="w-5 h-5 text-indigo-400" /> Cadastrar Nova Categoria
            </h3>
            <p className="text-xs text-slate-400 mb-5">Adicione um novo segmento para classificar os produtos.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome da Categoria</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Energia Solar & Geradores"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Descrição</label>
                <textarea
                  rows="3"
                  placeholder="Breve resumo dos itens contidos nesta categoria..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Criar Categoria
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
