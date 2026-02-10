import { useState } from "react";
import { validarPessoa } from "../utils/validacoes";
import { aplicarMascaraCpfCnpj, aplicarMascaraTelefone } from "../utils/mascaras";

export default function PessoaForm({
  initialValues,
  onSubmit,
  submitLabel,
  loading,
  apiErrors
}) {
  const [form, setForm] = useState(initialValues);
  const [erros, setErros] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    let nextValue = value;
    if (name === "cpfCnpj") {
      nextValue = aplicarMascaraCpfCnpj(value);
    }
    if (name === "telefone") {
      nextValue = aplicarMascaraTelefone(value);
    }
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validacao = validarPessoa(form);
    setErros(validacao);

    if (Object.keys(validacao).length > 0) {
      return;
    }

    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome completo</label>
        <input
          type="text"
          className={`form-control ${erros.nomeCompleto ? "is-invalid" : ""}`}
          name="nomeCompleto"
          value={form.nomeCompleto}
          onChange={handleChange}
        />
        {erros.nomeCompleto ? (
          <div className="invalid-feedback">{erros.nomeCompleto}</div>
        ) : null}
      </div>

      <div className="mb-3">
        <label className="form-label">CPF/CNPJ</label>
        <input
          type="text"
          className={`form-control ${erros.cpfCnpj ? "is-invalid" : ""}`}
          name="cpfCnpj"
          value={form.cpfCnpj}
          onChange={handleChange}
        />
        {erros.cpfCnpj ? <div className="invalid-feedback">{erros.cpfCnpj}</div> : null}
      </div>

      <div className="mb-3">
        <label className="form-label">Telefone</label>
        <input
          type="text"
          className={`form-control ${erros.telefone ? "is-invalid" : ""}`}
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        {erros.telefone ? <div className="invalid-feedback">{erros.telefone}</div> : null}
      </div>

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          type="email"
          className={`form-control ${erros.email ? "is-invalid" : ""}`}
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {erros.email ? <div className="invalid-feedback">{erros.email}</div> : null}
      </div>

      {apiErrors ? <div className="alert alert-danger">{apiErrors}</div> : null}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}
