import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PessoaForm from "../components/PessoaForm";
import { atualizarPessoa, obterPessoa } from "../api/pessoasApi";
import { extrairErrosCamposApi, extrairMensagemErroApi } from "../utils/errosApi";
import { mapPessoaApiToForm } from "../utils/pessoaFormConfig";
import "./EditarPessoa.css";

export default function EditarPessoa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState("");
  const [naoEncontrada, setNaoEncontrada] = useState(false);
  const [errosCampoApi, setErrosCampoApi] = useState({});
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    carregarPessoa();
  }, [id]);

  async function carregarPessoa() {
    try {
      setLoading(true);
      setErro("");
      setNaoEncontrada(false);

      const data = await obterPessoa(id);
      setFormData(mapPessoaApiToForm(data));
    } catch (error) {
      if (error?.status === 404) {
        setNaoEncontrada(true);
        setFormData(null);
        return;
      }

      setErro(extrairMensagemErroApi(error, "Nao foi possivel carregar a pessoa"));
      setFormData(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(values) {
    try {
      setSaving(true);
      setErro("");
      setErrosCampoApi({});
      await atualizarPessoa(id, values);
      navigate("/pessoas");
    } catch (error) {
      const campo = extrairErrosCamposApi(error);
      setErrosCampoApi(campo);

      if (Object.keys(campo).length === 0) {
        setErro(extrairMensagemErroApi(error, "Nao foi possivel atualizar a pessoa"));
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="pagina-cadastro">Carregando...</div>;
  }

  if (naoEncontrada) {
    return <div className="pagina-cadastro">Pessoa nao encontrada</div>;
  }

  if (!formData) {
    return <div className="pagina-cadastro">{erro || "Nao foi possivel carregar a pessoa"}</div>;
  }

  return (
    <div className="pagina-cadastro">
      <div className="cartao-cadastro">
        <PessoaForm
          initialValues={formData}
          onSubmit={handleSubmit}
          submitLabel="Gravar"
          loading={saving}
          apiErrors={erro}
          apiFieldErrors={errosCampoApi}
          onFechar={() => navigate("/pessoas")}
        />
      </div>
    </div>
  );
}

