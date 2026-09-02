import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { Clientes } from '../pages/Clientes';
import { Produtos } from '../pages/Produtos';
import { Categorias } from '../pages/Categorias';
import { Estoque } from '../pages/Estoque';
import { Orcamentos } from '../pages/Orcamentos';
import { Pedidos } from '../pages/Pedidos';
import { Usuarios } from '../pages/Usuarios';
import { Configuracoes } from '../pages/Configuracoes';
import { Relatorio } from '../pages/Relatorio';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="estoque" element={<Estoque />} />
        <Route path="orcamentos" element={<Orcamentos />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="relatorio" element={<Relatorio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
