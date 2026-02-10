function somenteDigitos(valor) {
  return (valor || "").replace(/\D/g, "");
}

function possuiDigitosIguais(digits) {
  return /^(\d)\1+$/.test(digits);
}

function validarCpfCnpj(valor) {
  const digits = somenteDigitos(valor);
  if (digits.length !== 11 && digits.length !== 14) {
    return false;
  }
  if (possuiDigitosIguais(digits)) {
    return false;
  }
  return true;
}

function validarTelefone(valor) {
  const digits = somenteDigitos(valor);
  return digits.length === 10 || digits.length === 11;
}

function validarEmail(valor) {
  const email = (valor || "").trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarPessoa(payload) {
  const erros = {};

  if (!payload.nomeCompleto?.trim()) {
    erros.nomeCompleto = "Nome completo e obrigatorio";
  }

  if (!payload.cpfCnpj?.trim()) {
    erros.cpfCnpj = "CPF/CNPJ e obrigatorio";
  } else if (!validarCpfCnpj(payload.cpfCnpj)) {
    erros.cpfCnpj = "CPF/CNPJ invalido";
  }

  if (!payload.telefone?.trim()) {
    erros.telefone = "Telefone e obrigatorio";
  } else if (!validarTelefone(payload.telefone)) {
    erros.telefone = "Telefone invalido";
  }

  if (!payload.email?.trim()) {
    erros.email = "E-mail e obrigatorio";
  } else if (!validarEmail(payload.email)) {
    erros.email = "E-mail invalido";
  }

  return erros;
}
