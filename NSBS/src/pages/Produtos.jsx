import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Layers,
  Trash2,
  Tag,
  DollarSign,
  AlertCircle,
  PlusCircle,
  MinusCircle,
  X
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

export const Produtos = () => {
  const { products, categories, addProduct, deleteProduct, updateProductStock, globalSearch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Equipamentos Tech',
    price: '',
    costPrice: '',
    stock: '',
    minStock: '3',
  });

  const activeSearch = searchTerm || globalSearch;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          p.sku.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.sku) return;
    addProduct({
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: parseFloat(formData.price),
      costPrice: parseFloat(formData.costPrice || 0),
      stock: parseInt(formData.stock || 0),
      minStock: parseInt(formData.minStock || 3)
    });
    setFormData({ name: '', sku: '', category: 'Equipamentos Tech', price: '', costPrice: '', stock: '', minStock: '3' });
    setIsModalOpen(false);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const getStockBadge = (status) => {
    switch (status) {
      case 'Em Estoque':
        return <Badge variant="success">Em Estoque</Badge>;
      case 'Estoque Baixo':
        return <Badge variant="warning">Estoque Baixo</Badge>;
      case 'Crítico':
        return <Badge variant="danger">Crítico</Badge>;
      case 'Esgotado':
        return <Badge variant="default">Esgotado</Badge>;
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
            <Package className="w-7 h-7 text-indigo-400" /> Catálogo de Produtos & Serviços
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Controle de precificação, SKUs, margem de lucro e catálogo comercial.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Produto
        </Button>
      </div>

      {/* Filter and Category Pills */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nome do produto, código SKU ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('Todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'Todas'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Todas ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <Card key={prod.id} hoverEffect className="flex flex-col justify-between p-5 space-y-4">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                  {prod.sku}
                </span>
                {getStockBadge(prod.status)}
              </div>

              <h3 className="text-base font-bold text-slate-100 mt-3 line-clamp-2">{prod.name}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-500" /> {prod.category}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Preço Venda</span>
                  <div className="text-lg font-black text-white">{formatCurrency(prod.price)}</div>
                </div>
                {prod.costPrice > 0 && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Margem Bruta</span>
                    <div className="text-xs font-bold text-emerald-400">
                      +{(((prod.price - prod.costPrice) / prod.costPrice) * 100).toFixed(0)}%
                    </div>
                  </div>
                )}
              </div>

              {/* Stock Controls */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400">
                  Estoque: <strong className="text-slate-200 font-bold">{prod.stock} un</strong> (mín: {prod.minStock})
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateProductStock(prod.id, Math.max(0, prod.stock - 1))}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Diminuir estoque"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateProductStock(prod.id, prod.stock + 1)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Aumentar estoque"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">{prod.salesCount} vendas realizadas</span>
                <button
                  onClick={() => deleteProduct(prod.id)}
                  className="text-rose-400 hover:text-rose-300 p-1 transition-colors cursor-pointer"
                  title="Excluir produto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Adicionar Produto */}
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
              <Package className="w-5 h-5 text-indigo-400" /> Cadastrar Novo Produto
            </h3>
            <p className="text-xs text-slate-400 mb-5">Adicione um novo item ao portfólio de vendas.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Produto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Servidor Rack 1U Xeon Gold"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Código SKU</label>
                  <input
                    type="text"
                    required
                    placeholder="SRV-XG64-02"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preço de Venda (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="18450.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preço de Custo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="13200.00"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estoque Inicial</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estoque Mínimo (Alerta)</label>
                  <input
                    type="number"
                    placeholder="3"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Cadastrar Produto
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
