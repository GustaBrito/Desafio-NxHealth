const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(
  /\/+$/,
  ""
);

function buildApiUrl(path) {
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

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

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw Object.assign(new Error(fallbackMessage), {
      status: response.status,
      url: response.url
    });
  }

  try {
    return await response.json();
  } catch {
    throw Object.assign(new Error(fallbackMessage), {
      status: response.status,
      url: response.url
    });
  }
}

async function requestWithoutBody(url, options, fallbackMessage) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw await createHttpError(response, fallbackMessage);
  }
}

export function listarPessoas() {
  return requestJson(buildApiUrl("/api/pessoas"), undefined, "Falha ao listar pessoas");
}

export function obterPessoa(id) {
  return requestJson(buildApiUrl(`/api/pessoas/${id}`), undefined, "Falha ao obter pessoa");
}

export function criarPessoa(payload) {
  return requestJson(
    buildApiUrl("/api/pessoas"),
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
    buildApiUrl(`/api/pessoas/${id}`),
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
    buildApiUrl(`/api/pessoas/${id}`),
    { method: "DELETE" },
    "Falha ao excluir pessoa"
  );
}
