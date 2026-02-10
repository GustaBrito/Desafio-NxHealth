import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PessoaForm from "../components/PessoaForm";
import { criarPessoa } from "../api/pessoasApi";
import { extrairMensagemErroApi } from "../utils/errosApi";

export default function CriarPessoa() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const initialValues = {
    nomeCompleto: "",
    cpfCnpj: "",
    telefone: "",
    email: ""
  };

  async function handleSubmit(values) {
    try {
      setLoading(true);
      await criarPessoa(values);
      navigate("/pessoas");
    } catch (error) {
      setErro(extrairMensagemErroApi(error, "Nao foi possivel criar a pessoa"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Nova pessoa</h1>
      <PessoaForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Salvar"
        loading={loading}
        apiErrors={erro}
      />
    </div>
  );
}
