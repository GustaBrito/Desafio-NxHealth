export async function listarPessoas() {
  const response = await fetch("/api/pessoas");
  if (!response.ok) {
    throw new Error("Falha ao listar pessoas");
  }
  return response.json();
}

export async function obterPessoa(id) {
  const response = await fetch(`/api/pessoas/${id}`);
  if (!response.ok) {
    throw new Error("Falha ao obter pessoa");
  }
  return response.json();
}

export async function criarPessoa(payload) {
  const response = await fetch("/api/pessoas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const error = new Error("Falha ao criar pessoa");
    error.details = errorBody;
    throw error;
  }

  return response.json();
}

export async function atualizarPessoa(id, payload) {
  const response = await fetch(`/api/pessoas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const error = new Error("Falha ao atualizar pessoa");
    error.details = errorBody;
    throw error;
  }
}

export async function excluirPessoa(id) {
  const response = await fetch(`/api/pessoas/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Falha ao excluir pessoa");
  }
}
