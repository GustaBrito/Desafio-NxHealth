export default function PessoasTable({ pessoas, onEditar, onExcluir }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nomeCompleto}</td>
              <td>{pessoa.cpfCnpj}</td>
              <td>{pessoa.telefone}</td>
              <td>{pessoa.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEditar(pessoa)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onExcluir(pessoa)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
