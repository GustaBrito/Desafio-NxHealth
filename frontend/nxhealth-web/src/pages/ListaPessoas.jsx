import { useEffect, useRef, useState } from "react";
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
  const [paginaDigitada, setPaginaDigitada] = useState("");
  const [inicioJanelaPaginas, setInicioJanelaPaginas] = useState(1);
  const paginaAnteriorRef = useRef(1);
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
  const semRegistros = pessoas.length === 0;
  const maximoBotoes = 3;
  const maxInicioJanela = Math.max(1, totalPaginas - (maximoBotoes - 1));
  const fimJanelaPaginas = Math.min(totalPaginas, inicioJanelaPaginas + (maximoBotoes - 1));
  const paginasVisiveis = [];

  for (let pagina = inicioJanelaPaginas; pagina <= fimJanelaPaginas; pagina++) {
    paginasVisiveis.push(pagina);
  }

  useEffect(() => {
    const paginaAnterior = paginaAnteriorRef.current;

    setInicioJanelaPaginas((inicioAtual) => {
      let proximoInicio = inicioAtual;

      if (paginaNormalizada > paginaAnterior) {
        proximoInicio = Math.min(paginaNormalizada, maxInicioJanela);
      } else if (paginaNormalizada < paginaAnterior) {
        proximoInicio = Math.max(1, Math.min(paginaNormalizada - 1, maxInicioJanela));
      }

      return Math.max(1, Math.min(proximoInicio, maxInicioJanela));
    });

    paginaAnteriorRef.current = paginaNormalizada;
  }, [paginaNormalizada, maxInicioJanela]);

  function irParaPaginaDigitada() {
    const alvo = Number(paginaDigitada);
    if (!Number.isInteger(alvo)) {
      return;
    }
    if (alvo < 1 || alvo > totalPaginas) {
      return;
    }
    setPaginaAtual(alvo);
  }

  return (
    <div className="pagina-cadastro">
      <div className="cabecalho-cadastro">
        <div>
          <h1>Cadastro de pessoas</h1>
          <span>Cadastros / Pessoas</span>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/pessoas/nova")}>
          Nova pessoa
        </button>
      </div>

      <div className="cartao-cadastro pesquisa-cadastro">
        <div className="conteudo-pesquisa">
          <div className="titulo-cartao">Pesquisa</div>
          <div className="grade-pesquisa">
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
            <div className="acoes-pesquisa">
              <button type="button" className="btn btn-outline-secondary" onClick={aplicarFiltro}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {erro ? <div className="alert alert-danger">{erro}</div> : null}

      {loading ? (
        <div className="cartao-cadastro">Carregando...</div>
      ) : pessoasFiltradas.length === 0 ? (
        <div className="cartao-cadastro estado-vazio">
          <h3>{semRegistros ? "Nenhuma pessoa cadastrada" : "Nenhum resultado encontrado"}</h3>
          <p>
            {semRegistros
              ? "Cadastre a primeira pessoa para iniciar sua base."
              : "Ajuste os filtros de pesquisa para visualizar os registros."}
          </p>
        </div>
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
        <div className="rodape-cadastro">
          <span>{`(${inicio + 1} - ${fim}) - ${totalRegistros}`}</span>
          <div className="controle-paginacao">
            <div className="ir-para-pagina">
              <input
                type="number"
                min="1"
                max={totalPaginas}
                className="form-control form-control-sm"
                placeholder="Pagina"
                value={paginaDigitada}
                onChange={(event) => setPaginaDigitada(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    irParaPaginaDigitada();
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={irParaPaginaDigitada}
              >
                Ir
              </button>
            </div>
            <div className="botoes-paginacao">
              {paginasVisiveis.map((pagina) => (
                <button
                  key={pagina}
                  type="button"
                  className={`btn btn-sm ${
                    pagina === paginaNormalizada ? "btn-primary" : "btn-outline-primary"
                  } indicador-paginacao`}
                  onClick={() => setPaginaAtual(pagina)}
                >
                  {pagina}
                </button>
              ))}
            </div>
          </div>
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

