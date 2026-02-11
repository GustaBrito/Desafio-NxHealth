async function parseErrorBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json().catch(() => null);
}

async function createHttpError(response, fallbackMessage) {
  const errorBody = await parseErrorBody(response);
  const error = new Error(fallbackMessage);
  error.details = errorBody;
  error.status = response.status;
  error.url = response.url;
  return error;
}

async function requestJson(url, options, fallbackMessage) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw await createHttpError(response, fallbackMessage);
  }

  return response.json();
}

async function requestWithoutBody(url, options, fallbackMessage) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw await createHttpError(response, fallbackMessage);
  }
}

export function listarPessoas() {
  return requestJson("/api/pessoas", undefined, "Falha ao listar pessoas");
}

export function obterPessoa(id) {
  return requestJson(`/api/pessoas/${id}`, undefined, "Falha ao obter pessoa");
}

export function criarPessoa(payload) {
  return requestJson(
    "/api/pessoas",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    },
    "Falha ao criar pessoa"
  );
}

export function atualizarPessoa(id, payload) {
  return requestWithoutBody(
    `/api/pessoas/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    },
    "Falha ao atualizar pessoa"
  );
}

export function excluirPessoa(id) {
  return requestWithoutBody(
    `/api/pessoas/${id}`,
    { method: "DELETE" },
    "Falha ao excluir pessoa"
  );
}
