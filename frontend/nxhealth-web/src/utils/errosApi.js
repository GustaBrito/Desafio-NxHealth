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

  if (error?.details?.title) {
    return error.details.title;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback || "Ocorreu um erro inesperado";
}
