import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import PessoasTable from "../components/PessoasTable";
import { excluirPessoa, listarPessoas } from "../api/pessoasApi";
import { extrairMensagemErroApi } from "../utils/errosApi";
import "./ListaPessoas.css";

function somenteDigitos(valor) {
  return String(valor || "").replace(/\D/g, "");
}

export default function ListaPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [selecionada, setSelecionada] = useState(null);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCpf, setFiltroCpf] = useState("");
  const [aplicado, setAplicado] = useState({ nome: "", cpf: "" });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const tamanhoPagina = 10;
  const [ordenacao, setOrdenacao] = useState({
    campo: "nomeCompleto",
    direcao: "asc"
  });
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

  function aplicarFiltro() {
    setAplicado({ nome: filtroNome, cpf: filtroCpf });
    setPaginaAtual(1);
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

  const pessoasFiltradas = pessoas.filter((pessoa) => {
    const nomeOk = aplicado.nome
      ? pessoa.nomeCompleto?.toLowerCase().includes(aplicado.nome.toLowerCase())
      : true;
    const cpfFiltro = somenteDigitos(aplicado.cpf);
    const cpfPessoa = somenteDigitos(pessoa.cpfCnpj);
    const cpfOk = cpfFiltro ? cpfPessoa.includes(cpfFiltro) : true;
    return nomeOk && cpfOk;
  });

  const pessoasOrdenadas = [...pessoasFiltradas].sort((a, b) => {
    const campo = ordenacao.campo;
    const valorA = (a[campo] || "").toString().toLowerCase();
    const valorB = (b[campo] || "").toString().toLowerCase();
    if (valorA < valorB) return ordenacao.direcao === "asc" ? -1 : 1;
    if (valorA > valorB) return ordenacao.direcao === "asc" ? 1 : -1;
    return 0;
  });

  function handleOrdenar(campo) {
    setOrdenacao((prev) => {
      if (prev.campo === campo) {
        return { campo, direcao: prev.direcao === "asc" ? "desc" : "asc" };
      }
      return { campo, direcao: "asc" };
    });
  }

  const totalRegistros = pessoasOrdenadas.length;
  const totalPaginas = Math.max(1, Math.ceil(totalRegistros / tamanhoPagina));
  const paginaNormalizada = Math.min(paginaAtual, totalPaginas);
  const inicio = (paginaNormalizada - 1) * tamanhoPagina;
  const fim = Math.min(inicio + tamanhoPagina, totalRegistros);
  const pessoasPaginadas = pessoasOrdenadas.slice(inicio, fim);

  return (
    <div className="nx-page">
      <div className="nx-header">
        <div>
          <h1>Cadastro de pessoas</h1>
          <span>Cadastros / Pessoas</span>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/pessoas/nova")}>
          Nova pessoa
        </button>
      </div>

      <div className="nx-card nx-search">
        <div className="nx-card-title">Pesquisa</div>
        <div className="nx-search-grid">
          <div>
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              value={filtroNome}
              onChange={(event) => setFiltroNome(event.target.value)}
            />
          </div>
          <div>
            <label className="form-label">CPF</label>
            <input
              className="form-control"
              value={filtroCpf}
              onChange={(event) => setFiltroCpf(event.target.value)}
            />
          </div>
          <div className="nx-search-actions">
            <button type="button" className="btn btn-outline-secondary" onClick={aplicarFiltro}>
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {erro ? <div className="alert alert-danger">{erro}</div> : null}

      {loading ? (
        <div className="nx-card">Carregando...</div>
      ) : pessoasFiltradas.length === 0 ? (
        <div className="nx-card">Nenhuma pessoa cadastrada</div>
      ) : (
        <PessoasTable
          pessoas={pessoasPaginadas}
          onEditar={handleEditar}
          onExcluir={handleExcluir}
          ordenacao={ordenacao}
          onOrdenar={handleOrdenar}
        />
      )}

      {pessoasFiltradas.length > 0 ? (
        <div className="nx-footer">
          <span>{`(${inicio + 1} - ${fim}) - ${totalRegistros}`}</span>
          <button
            type="button"
            className="btn btn-primary btn-sm nx-page-indicator"
            onClick={() =>
              setPaginaAtual((prev) => (prev >= totalPaginas ? 1 : prev + 1))
            }
            disabled={totalPaginas === 1}
          >
            {`${paginaNormalizada}/${totalPaginas} (${totalRegistros})`}
          </button>
        </div>
      ) : null}

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
