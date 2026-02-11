import { useEffect, useState } from "react";
import { aplicarMascaraCep, aplicarMascaraCpfCnpj, aplicarMascaraTelefone } from "../utils/mascaras";
import { FORM_EMPTY_VALUES, UF_OPCOES } from "../utils/pessoaFormConfig";
import { validarPessoa } from "../utils/validacoes";
import "./PessoaForm.css";

export default function PessoaForm({
  initialValues,
  onSubmit,
  submitLabel,
  loading,
  apiErrors,
  apiFieldErrors = {},
  onFechar = () => {}
}) {
  const [form, setForm] = useState({ ...FORM_EMPTY_VALUES, ...initialValues });
  const [erros, setErros] = useState({});

  useEffect(() => {
    const base = { ...FORM_EMPTY_VALUES, ...initialValues };
    setForm({
      ...base,
      cpfCnpj: aplicarMascaraCpfCnpj(base.cpfCnpj),
      telefone: aplicarMascaraTelefone(base.telefone),
      cep: aplicarMascaraCep(base.cep)
    });
    setErros({});
  }, [initialValues]);

  useEffect(() => {
    if (Object.keys(apiFieldErrors).length > 0) {
      setErros((prev) => ({ ...prev, ...apiFieldErrors }));
    }
  }, [apiFieldErrors]);

  function handleChange(event) {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "cpfCnpj") {
      nextValue = aplicarMascaraCpfCnpj(value);
    }

    if (name === "telefone") {
      nextValue = aplicarMascaraTelefone(value);
    }

    if (name === "cep") {
      nextValue = aplicarMascaraCep(value);
    }

    if (name === "uf") {
      nextValue = value.toUpperCase().slice(0, 2);
    }

    setErros((prev) => {
      if (!prev[name]) {
        return prev;
      }

      const updated = { ...prev };
      delete updated[name];
      return updated;
    });

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

  function limparCampos() {
    setForm(FORM_EMPTY_VALUES);
    setErros({});
  }

  return (
    <form onSubmit={handleSubmit} className="pessoa-form">
      <div className="pessoa-form-header">Dados da pessoa</div>

      <div className="pessoa-grid pessoa-grid-2">
        <div>
          <label className="form-label">Nome completo</label>
          <input
            type="text"
            className={`form-control ${erros.nomeCompleto ? "is-invalid" : ""}`}
            name="nomeCompleto"
            value={form.nomeCompleto}
            onChange={handleChange}
          />
          {erros.nomeCompleto ? <div className="invalid-feedback">{erros.nomeCompleto}</div> : null}
        </div>

        <div>
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
      </div>

      <div className="pessoa-grid pessoa-grid-4">
        <div>
          <label className="form-label">Tipo da pessoa</label>
          <select
            className={`form-select ${erros.tipoPessoa ? "is-invalid" : ""}`}
            name="tipoPessoa"
            value={form.tipoPessoa}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Pessoa fisica">Pessoa fisica</option>
            <option value="Pessoa juridica">Pessoa juridica</option>
          </select>
          {erros.tipoPessoa ? <div className="invalid-feedback">{erros.tipoPessoa}</div> : null}
        </div>

        <div>
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

        <div>
          <label className="form-label">CEP</label>
          <input
            type="text"
            className={`form-control ${erros.cep ? "is-invalid" : ""}`}
            name="cep"
            value={form.cep}
            onChange={handleChange}
          />
          {erros.cep ? <div className="invalid-feedback">{erros.cep}</div> : null}
        </div>

        <div>
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
      </div>

      <div className="pessoa-grid pessoa-grid-2">
        <div>
          <label className="form-label">Logradouro</label>
          <input
            type="text"
            className={`form-control ${erros.logradouro ? "is-invalid" : ""}`}
            name="logradouro"
            value={form.logradouro}
            onChange={handleChange}
          />
          {erros.logradouro ? <div className="invalid-feedback">{erros.logradouro}</div> : null}
        </div>

        <div>
          <label className="form-label">Endereco</label>
          <input
            type="text"
            className={`form-control ${erros.endereco ? "is-invalid" : ""}`}
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
          />
          {erros.endereco ? <div className="invalid-feedback">{erros.endereco}</div> : null}
        </div>
      </div>

      <div className="pessoa-grid pessoa-grid-3">
        <div>
          <label className="form-label">Bairro</label>
          <input
            type="text"
            className={`form-control ${erros.bairro ? "is-invalid" : ""}`}
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
          />
          {erros.bairro ? <div className="invalid-feedback">{erros.bairro}</div> : null}
        </div>

        <div>
          <label className="form-label">Cidade</label>
          <input
            type="text"
            className={`form-control ${erros.cidade ? "is-invalid" : ""}`}
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
          />
          {erros.cidade ? <div className="invalid-feedback">{erros.cidade}</div> : null}
        </div>

        <div>
          <label className="form-label">UF</label>
          <select
            className={`form-select ${erros.uf ? "is-invalid" : ""}`}
            name="uf"
            value={form.uf}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {UF_OPCOES.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
          {erros.uf ? <div className="invalid-feedback">{erros.uf}</div> : null}
        </div>
      </div>

      {apiErrors ? <div className="alert alert-danger">{apiErrors}</div> : null}

      <div className="pessoa-form-footer">
        <div className="pessoa-form-footer-left">
          <button type="button" className="btn btn-outline-secondary" onClick={limparCampos}>
            Cancelar
          </button>
          <button type="button" className="btn btn-light" onClick={onFechar}>
            Fechar
          </button>
        </div>
        <div className="pessoa-form-footer-right">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Gravando..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
