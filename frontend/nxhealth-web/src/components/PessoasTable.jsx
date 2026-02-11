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
      const dentroDoBotao = event.target.closest?.(".nx-dropdown-toggle");
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
      return <span className="nx-sort">↕</span>;
    }
    return (
      <span className="nx-sort-active">{ordenacao.direcao === "asc" ? "↑" : "↓"}</span>
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
    <div className="table-responsive nx-table-wrapper">
      <table className="table nx-table">
        <thead>
          <tr>
            <th className="nx-sortable" onClick={() => onOrdenar("nomeCompleto")}>
              <button type="button" className="nx-sort-button">
                Nome {renderSort("nomeCompleto")}
              </button>
            </th>
            <th className="nx-sortable" onClick={() => onOrdenar("cpfCnpj")}>
              <button type="button" className="nx-sort-button">
                CPF/CNPJ {renderSort("cpfCnpj")}
              </button>
            </th>
            <th className="nx-sortable" onClick={() => onOrdenar("email")}>
              <button type="button" className="nx-sort-button">
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
                <div className="nx-dropdown">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary nx-dropdown-toggle"
                    onClick={(event) => toggleMenu(event, pessoa)}
                  >
                    ▾
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
          className="nx-dropdown-menu nx-dropdown-menu-fixed"
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
