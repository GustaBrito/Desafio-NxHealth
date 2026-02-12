import { aplicarMascaraCpfCnpj } from "../utils/mascaras";
import "./PessoasTable.css";

export default function PessoasTable({
  pessoas,
  onEditar,
  onExcluir,
  ordenacao,
  onOrdenar
}) {
  function renderSort(coluna) {
    if (ordenacao?.campo !== coluna) {
      return <span className="indicador-ordenacao">^v</span>;
    }
    return (
      <span className="indicador-ordenacao-ativo">{ordenacao.direcao === "asc" ? "^" : "v"}</span>
    );
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
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nomeCompleto}</td>
              <td>{aplicarMascaraCpfCnpj(pessoa.cpfCnpj)}</td>
              <td>{pessoa.email}</td>
              <td>
                <div className="acoes-linha">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary botao-acao"
                    title="Editar"
                    aria-label="Editar"
                    onClick={() => onEditar(pessoa)}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M12.85 1.15a1.5 1.5 0 0 1 2.12 2.12l-8.9 8.9-3.29.98a.75.75 0 0 1-.93-.93l.98-3.29 8.9-8.9zm1.06 1.06a.5.5 0 0 0-.7 0l-1.08 1.08 1.76 1.76 1.08-1.08a.5.5 0 0 0 0-.7l-1.06-1.06zM11.07 4.35 3.48 11.94l-.55 1.84 1.84-.55 7.59-7.59-1.29-1.29z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger botao-acao"
                    title="Excluir"
                    aria-label="Excluir"
                    onClick={() => onExcluir(pessoa)}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M6.5 1a1 1 0 0 0-1 1V3H3a.5.5 0 0 0 0 1h.5l.62 9.07A2 2 0 0 0 6.12 15h3.76a2 2 0 0 0 2-1.93L12.5 4H13a.5.5 0 0 0 0-1H10.5V2a1 1 0 0 0-1-1h-3zm3 2h-3V2h3v1zm-4.37 1h5.74l-.6 8.98a1 1 0 0 1-1 .96H6.73a1 1 0 0 1-1-.96L5.13 4z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

