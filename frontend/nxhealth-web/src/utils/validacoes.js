export function validarPessoa(payload) {
  const erros = {};

  if (!payload.nomeCompleto?.trim()) {
    erros.nomeCompleto = "Nome completo e obrigatorio";
  }

  if (!payload.cpfCnpj?.trim()) {
    erros.cpfCnpj = "CPF/CNPJ e obrigatorio";
  }

  if (!payload.telefone?.trim()) {
    erros.telefone = "Telefone e obrigatorio";
  }

  if (!payload.email?.trim()) {
    erros.email = "E-mail e obrigatorio";
  }

  return erros;
}
