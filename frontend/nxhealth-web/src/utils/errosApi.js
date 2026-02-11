export function extrairMensagemErroApi(error, fallback) {
  if (error?.details?.errors) {
    const mensagens = [];
    for (const campo of Object.keys(error.details.errors)) {
      const lista = error.details.errors[campo];
      if (Array.isArray(lista) && lista.length > 0) {
        mensagens.push(lista[0]);
      }
    }
    if (mensagens.length > 0) {
      return mensagens.join(" ");
    }
  }

  if (error?.details?.message) {
    return error.details.message;
  }

  if (error?.details?.title) {
    return error.details.title;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback || "Ocorreu um erro inesperado";
}

export function extrairErrosCamposApi(error) {
  const erros = {};

  if (error?.details?.errors) {
    for (const campo of Object.keys(error.details.errors)) {
      const lista = error.details.errors[campo];
      if (Array.isArray(lista) && lista.length > 0) {
        const chave = normalizarCampo(campo);
        erros[chave] = lista[0];
      }
    }
  }

  if (error?.details?.message && /cpf\/cnpj/i.test(error.details.message)) {
    erros.cpfCnpj = error.details.message;
  }

  return erros;
}

function normalizarCampo(campo) {
  const bruto = String(campo || "").trim();
  const partes = bruto.split(".").filter(Boolean);
  const candidato = partes.length > 0 ? partes[partes.length - 1] : bruto;
  const key = candidato.replace(/\s+/g, "");
  const keyNormalizada = normalizarPascalCase(key);
  const mapa = {
    nomecompleto: "nomeCompleto",
    tipopessoa: "tipoPessoa",
    cpfcnpj: "cpfCnpj",
    telefone: "telefone",
    email: "email",
    cep: "cep",
    endereco: "endereco",
    logradouro: "logradouro",
    bairro: "bairro",
    cidade: "cidade",
    uf: "uf"
  };

  if (mapa[keyNormalizada]) {
    return mapa[keyNormalizada];
  }

  return toCamelCase(candidato);
}

function normalizarPascalCase(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function toCamelCase(valor) {
  const partes = String(valor || "")
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

  if (partes.length === 0) {
    return "";
  }

  const [primeira, ...resto] = partes;
  return (
    primeira.charAt(0).toLowerCase() +
    primeira.slice(1) +
    resto.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("")
  );
}
