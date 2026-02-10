import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import PessoasTable from "../components/PessoasTable";
import { excluirPessoa, listarPessoas } from "../api/pessoasApi";
import { extrairMensagemErroApi } from "../utils/errosApi";

export default function ListaPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [selecionada, setSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);
      const data = await listarPessoas();
      setPessoas(data);
    } catch (error) {
      setErro(extrairMensagemErroApi(error, "Nao foi possivel carregar as pessoas"));
    } finally {
      setLoading(false);
    }
  }

  function handleEditar(pessoa) {
    navigate(`/pessoas/${pessoa.id}/editar`);
  }

  function handleExcluir(pessoa) {
    setSelecionada(pessoa);
  }

  async function confirmarExclusao() {
    if (!selecionada) {
      return;
    }

    try {
      await excluirPessoa(selecionada.id);
      setPessoas((prev) => prev.filter((p) => p.id !== selecionada.id));
    } catch (error) {
      setErro(extrairMensagemErroApi(error, "Nao foi possivel excluir a pessoa"));
    } finally {
      setSelecionada(null);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3">Pessoas</h1>
        <button className="btn btn-primary" onClick={() => navigate("/pessoas/nova")}>
          Nova pessoa
        </button>
      </div>

      {erro ? <div className="alert alert-danger">{erro}</div> : null}

      {loading ? (
        <div>Carregando...</div>
      ) : pessoas.length === 0 ? (
        <div className="alert alert-info">Nenhuma pessoa cadastrada</div>
      ) : (
        <PessoasTable pessoas={pessoas} onEditar={handleEditar} onExcluir={handleExcluir} />
      )}

      <ConfirmModal
        aberto={Boolean(selecionada)}
        titulo="Confirmar exclusao"
        mensagem="Tem certeza que deseja excluir esta pessoa?"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setSelecionada(null)}
      />
    </div>
  );
}
