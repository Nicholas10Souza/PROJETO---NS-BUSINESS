import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import {
  initialMetrics,
  initialSalesChartData,
  initialClients,
  initialCategories,
  initialProducts,
  initialOrders,
  initialQuotes,
  initialUsers,
  initialSettings
} from '../mock/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [salesChartData] = useState(initialSalesChartData);
  const [clients, setClients] = useState(initialClients);
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [users, setUsers] = useState(initialUsers);
  const [settings, setSettings] = useState(initialSettings);
  const [globalSearch, setGlobalSearch] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Clients Actions
  const addClient = (newClient) => {
    const clientWithId = {
      ...newClient,
      id: `CLI-${String(clients.length + 1).padStart(3, '0')}`,
      totalSpent: 0,
      ordersCount: 0,
      status: 'Ativo'
    };
    setClients([clientWithId, ...clients]);
    toast.success(`Cliente ${newClient.name} cadastrado com sucesso!`);
  };

  const deleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
    toast.success('Cliente removido com sucesso.');
  };

  // Products Actions
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
      salesCount: 0,
      rating: 5.0,
      status: Number(newProduct.stock) > Number(newProduct.minStock) ? 'Em Estoque' : 'Estoque Baixo'
    };
    setProducts([productWithId, ...products]);
    toast.success(`Produto "${newProduct.name}" adicionado ao catálogo!`);
  };

  const updateProductStock = (id, newStock) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const stockNum = Number(newStock);
        const status = stockNum === 0 ? 'Esgotado' : stockNum <= p.minStock ? 'Estoque Baixo' : 'Em Estoque';
        return { ...p, stock: stockNum, status };
      }
      return p;
    }));
    toast.success('Estoque atualizado!');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Produto excluído do catálogo.');
  };

  // Category Actions
  const addCategory = (newCat) => {
    const catWithId = {
      ...newCat,
      id: `CAT-${String(categories.length + 1).padStart(2, '0')}`,
      productCount: 0,
      color: 'from-indigo-600 to-cyan-600',
      icon: 'Layers'
    };
    setCategories([...categories, catWithId]);
    toast.success(`Categoria "${newCat.name}" criada com sucesso!`);
  };

  // Orders Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, shippingStatus: newStatus } : o));
    toast.success(`Status do pedido ${orderId} alterado para: ${newStatus}`);
  };

  const addOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: `PED-${9082 + orders.length}`,
      date: new Date().toISOString().split('T')[0],
      paymentStatus: 'Pago',
      shippingStatus: 'Em Separação',
      urgency: 'Normal'
    };
    setOrders([orderWithId, ...orders]);
    setMetrics(prev => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      monthlyRevenue: prev.monthlyRevenue + Number(newOrder.total)
    }));
    toast.success(`Pedido ${orderWithId.id} gerado com sucesso!`);
  };

  // Quotes Actions
  const updateQuoteStatus = (quoteId, newStatus) => {
    setQuotes(quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q));
    toast.success(`Orçamento ${quoteId} atualizado para ${newStatus}!`);
  };

  const addQuote = (newQuote) => {
    const quoteWithId = {
      ...newQuote,
      id: `ORC-2026-${105 + quotes.length}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pendente',
      probability: '60%'
    };
    setQuotes([quoteWithId, ...quotes]);
    toast.success(`Orçamento ${quoteWithId.id} criado com sucesso!`);
  };

  // User Actions
  const addUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: `USR-${String(users.length + 1).padStart(2, '0')}`,
      status: 'Ativo',
      lastLogin: 'Primeiro acesso pendente',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    };
    setUsers([...users, userWithId]);
    toast.success(`Usuário ${newUser.name} cadastrado no time!`);
  };

  // Settings Actions
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <AppContext.Provider
      value={{
        metrics,
        salesChartData,
        clients,
        categories,
        products,
        orders,
        quotes,
        users,
        settings,
        globalSearch,
        setGlobalSearch,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        addClient,
        deleteClient,
        addProduct,
        updateProductStock,
        deleteProduct,
        addCategory,
        updateOrderStatus,
        addOrder,
        updateQuoteStatus,
        addQuote,
        addUser,
        updateSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser utilizado dentro de um AppProvider');
  }
  return context;
};
