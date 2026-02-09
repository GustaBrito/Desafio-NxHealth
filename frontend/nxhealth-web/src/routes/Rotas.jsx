import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ListaPessoas from "../pages/ListaPessoas";
import CriarPessoa from "../pages/CriarPessoa";
import EditarPessoa from "../pages/EditarPessoa";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pessoas" />} />
        <Route path="/pessoas" element={<ListaPessoas />} />
        <Route path="/pessoas/nova" element={<CriarPessoa />} />
        <Route path="/pessoas/:id/editar" element={<EditarPessoa />} />
      </Routes>
    </BrowserRouter>
  );
}
