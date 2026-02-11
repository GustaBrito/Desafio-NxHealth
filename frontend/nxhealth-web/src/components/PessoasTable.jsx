import { useEffect, useRef, useState } from "react";
import { aplicarMascaraCpfCnpj } from "../utils/mascaras";
import "./PessoasTable.css";

export default function PessoasTable({
  pessoas,
  onEditar,
  onExcluir,
  ordenacao,
  onOrdenar
}) {
  const [menu, setMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickFora(event) {
      if (!menu) {
        return;
      }
      const dentroDoMenu = menuRef.current?.contains(event.target);
      const dentroDoBotao = event.target.closest?.(".botao-menu-acoes");
      if (!dentroDoMenu && !dentroDoBotao) {
        setMenu(null);
      }
    }

    function handleViewportChange() {
      if (menu) {
        setMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    window.addEventListener("scroll", handleViewportChange, true);
    window.addEventListener("resize", handleViewportChange);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
      window.removeEventListener("scroll", handleViewportChange, true);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [menu]);

  function renderSort(coluna) {
    if (ordenacao?.campo !== coluna) {
      return <span className="indicador-ordenacao">^v</span>;
    }
    return (
      <span className="indicador-ordenacao-ativo">{ordenacao.direcao === "asc" ? "^" : "v"}</span>
    );
  }

  function toggleMenu(event, pessoa) {
    if (menu?.id === pessoa.id) {
      setMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const larguraMenu = 136;
    const alturaMenu = 86;
    const margem = 8;

    const leftBruto = rect.left - larguraMenu;
    const topBruto = rect.top;

    const left = Math.max(margem, Math.min(leftBruto, window.innerWidth - larguraMenu - margem));
    const top = Math.max(margem, Math.min(topBruto, window.innerHeight - alturaMenu - margem));

    setMenu({
      id: pessoa.id,
      pessoa,
      top,
      left
    });
  }

  function handleEditarSelecionado() {
    if (!menu) {
      return;
    }
    onEditar(menu.pessoa);
    setMenu(null);
  }

  function handleExcluirSelecionado() {
    if (!menu) {
      return;
    }
    onExcluir(menu.pessoa);
    setMenu(null);
  }

  return (
    <div className="table-responsive tabela-pessoas-wrapper">
      <table className="table tabela-pessoas">
        <thead>
          <tr>
            <th className="coluna-ordenavel" onClick={() => onOrdenar("nomeCompleto")}>
              <button type="button" className="botao-ordenacao">
                Nome {renderSort("nomeCompleto")}
              </button>
            </th>
            <th className="coluna-ordenavel" onClick={() => onOrdenar("cpfCnpj")}>
              <button type="button" className="botao-ordenacao">
                CPF/CNPJ {renderSort("cpfCnpj")}
              </button>
            </th>
            <th className="coluna-ordenavel" onClick={() => onOrdenar("email")}>
              <button type="button" className="botao-ordenacao">
                E-mail {renderSort("email")}
              </button>
            </th>
            <th>Opcoes</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nomeCompleto}</td>
              <td>{aplicarMascaraCpfCnpj(pessoa.cpfCnpj)}</td>
              <td>{pessoa.email}</td>
              <td>
                <div className="menu-acoes">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary botao-menu-acoes"
                    onClick={(event) => toggleMenu(event, pessoa)}
                  >
                    v
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {menu ? (
        <div
          ref={menuRef}
          className="menu-acoes-lista menu-acoes-fixo"
          style={{ top: `${menu.top}px`, left: `${menu.left}px` }}
        >
          <button type="button" onClick={handleEditarSelecionado}>
            Editar
          </button>
          <button type="button" onClick={handleExcluirSelecionado}>
            Excluir
          </button>
        </div>
      ) : null}
    </div>
  );
}

