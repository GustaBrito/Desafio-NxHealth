import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PessoaForm from "../components/PessoaForm";
import { atualizarPessoa, obterPessoa } from "../api/pessoasApi";
import { extrairMensagemErroApi } from "../utils/errosApi";

export default function EditarPessoa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState("");
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    carregarPessoa();
  }, [id]);

  async function carregarPessoa() {
    try {
      setLoading(true);
      const data = await obterPessoa(id);
      setFormData({
        nomeCompleto: data.nomeCompleto,
        cpfCnpj: data.cpfCnpj,
        telefone: data.telefone,
        email: data.email
      });
    } catch (error) {
      setErro(extrairMensagemErroApi(error, "Nao foi possivel carregar a pessoa"));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(values) {
    try {
      setSaving(true);
      await atualizarPessoa(id, values);
      navigate("/pessoas");
    } catch (error) {
      setErro(extrairMensagemErroApi(error, "Nao foi possivel atualizar a pessoa"));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="container py-4">Carregando...</div>;
  }

  if (!formData) {
    return <div className="container py-4">Pessoa nao encontrada</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Editar pessoa</h1>
      {erro ? <div className="alert alert-danger">{erro}</div> : null}
      <PessoaForm
        initialValues={formData}
        onSubmit={handleSubmit}
        submitLabel="Salvar alteracoes"
        loading={saving}
      />
    </div>
  );
}
