import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PessoaForm from "../components/PessoaForm";
import { criarPessoa } from "../api/pessoasApi";
import { extrairErrosCamposApi, extrairMensagemErroApi } from "../utils/errosApi";
import { FORM_EMPTY_VALUES } from "../utils/pessoaFormConfig";
import "./CriarPessoa.css";

export default function CriarPessoa() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [errosCampoApi, setErrosCampoApi] = useState({});

  async function handleSubmit(values) {
    try {
      setLoading(true);
      setErro("");
      setErrosCampoApi({});
      await criarPessoa(values);
      navigate("/pessoas");
    } catch (error) {
      const campo = extrairErrosCamposApi(error);
      setErrosCampoApi(campo);

      if (Object.keys(campo).length === 0) {
        setErro(extrairMensagemErroApi(error, "Nao foi possivel criar a pessoa"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="nx-page">
      <div className="nx-card">
        <PessoaForm
          initialValues={FORM_EMPTY_VALUES}
          onSubmit={handleSubmit}
          submitLabel="Gravar"
          loading={loading}
          apiErrors={erro}
          apiFieldErrors={errosCampoApi}
          onFechar={() => navigate("/pessoas")}
        />
      </div>
    </div>
  );
}
