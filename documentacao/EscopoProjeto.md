# Guia do Projeto - Cadastro de Pessoas (CRUD)

## 1) Objetivo
Construir um Cadastro de Pessoas em formato SPA (Single Page Application), com React no frontend e ASP.NET Core Web API no backend, permitindo listar, criar, editar e excluir registros de pessoas.

A palavra CRUD aqui e literal:
- Create: cadastrar pessoa
- Read: listar pessoas e buscar uma pessoa para editar
- Update: editar pessoa
- Delete: excluir pessoa

## 2) Funcionalidades exigidas (passo a passo do usuario)

### 2.1 Listagem de Pessoas (Tela de Lista)
O que pedem:
- Exibir usuarios cadastrados em tabela responsiva
- Cada linha mostra no minimo: Nome e CPF/CNPJ
- Cada linha tem acoes: Editar e Excluir

O que isso vira no projeto:
- Rota/pagina `/pessoas`
- Backend: `GET /api/pessoas`
- Front: tabela Bootstrap (`table`, `table-responsive`)
- Botoes por linha:
  - Editar: navega para `/pessoas/:id/editar` (ou abre formulario na mesma rota)
  - Excluir: abre modal de confirmacao

Observacao:
- "No minimo" = voce pode exibir Telefone/E-mail tambem, mas Nome e CPF/CNPJ sao obrigatorios.

### 2.2 Cadastro de Pessoas (Tela de Cadastro)
O que pedem:
- Um formulario para adicionar pessoa usando componentes de formulario
- Campos obrigatorios:
  - Nome Completo
  - CPF/CNPJ
  - Telefone
  - E-mail
- Ao submeter com sucesso: redirecionar para listagem

O que isso vira no projeto:
- Rota `/pessoas/nova`
- Backend: `POST /api/pessoas`
- Validacoes minimas: nao aceitar payload invalido; retornar 400 com erros
- Front:
  - Form Bootstrap (`form-control`, `row`, `col`)
  - Ao salvar com sucesso (201/200), executar `navigate("/pessoas")`

Detalhe avaliado:
- Tratamento de erro de API no front, exibindo feedback no form (ex.: "CPF invalido", "E-mail invalido").

### 2.3 Edicao de Pessoas (Tela de Edicao)
O que pedem:
- Clicar "Editar" leva o usuario a um formulario preenchido com os dados
- Salvar alteracoes redireciona para listagem

O que isso vira no projeto:
- Rota `/pessoas/:id/editar`
- Backend:
  - `GET /api/pessoas/{id}` para carregar dados do form
  - `PUT /api/pessoas/{id}` (ou PATCH) para atualizar
- Front:
  - Componente de formulario reutilizavel
  - Modo "create": valores vazios + POST
  - Modo "edit": carrega dados + PUT

Detalhe comum de bug:
- Garantir que o form so renderiza preenchido depois do GET (loading state).

### 2.4 Exclusao de Pessoas (Modal de confirmacao)
O que pedem:
- Ao clicar "Excluir", abrir modal de confirmacao para evitar exclusao acidental
- Confirmando, remover pessoa da lista

O que isso vira no projeto:
- Front: modal Bootstrap controlado por estado
- Confirmar: chama API de delete
- Backend: `DELETE /api/pessoas/{id}` retornando 204 No Content

Depois do delete:
- Ou refaz `GET /api/pessoas`
- Ou remove do state local

Detalhe avaliado:
- Nao excluir sem confirmacao (modal e obrigatorio).

## 3) Requisitos tecnicos (stack obrigatoria)

### Frontend
- React obrigatorio
- Bootstrap obrigatorio
- Interface responsiva

Na pratica:
- Usar classes do Bootstrap para layout (grid, breakpoints, tabela responsiva, modal)
- Rodar como SPA (React Router)

### Backend
- C# obrigatorio
- ASP.NET Core Web API obrigatorio
- Dependencias via NuGet

Observacao:
- O desafio nao exige banco especifico. Opcao comum: EF Core + SQLite (recomendado). Em memoria e possivel, mas tende a pontuar menos.

## 4) O que sera avaliado

### Estrutura do projeto
- Pastas bem organizadas (front e back separados)
- Componentes reutilizaveis no React

### Qualidade do codigo
- Legibilidade, nomes bons, padroes
- Boas praticas: validacao, tratamento de erro

### Controle de versao (Git)
- Commits pequenos e descritivos

### Seguimento dos requisitos
- Listagem + cadastro + edicao + exclusao com modal
- React + Bootstrap + ASP.NET Core

## 5) Entregaveis obrigatorios
- Repositorio publico (GitHub/GitLab)
- README.md contendo:
  - Seu nome
  - Breve descricao do projeto
  - Instrucoes para rodar:
    - Backend: `dotnet restore`, `dotnet run`
    - Frontend: `npm install`, `npm start`

## 6) Observacao sobre as telas de referencia
As telas do PDF sao apenas inspiracao. Nao precisa replicar igual; criatividade e bem-vinda. Nao fugir do escopo do CRUD.

## 7) Checklist final (o que precisa existir)

### Front (React + Bootstrap)
- Pagina de lista com tabela responsiva (Nome + CPF/CNPJ + acoes)
- Pagina de criar pessoa com form (Nome, CPF/CNPJ, Telefone, E-mail)
- Pagina de editar com o mesmo form preenchido
- Exclusao com modal Bootstrap de confirmacao
- Redirecionar para listagem apos create e update

### Back (ASP.NET Core Web API)
- Endpoints:
  - `GET /api/pessoas`
  - `GET /api/pessoas/{id}`
  - `POST /api/pessoas`
  - `PUT /api/pessoas/{id}`
  - `DELETE /api/pessoas/{id}`
- Model/DTO com: `NomeCompleto`, `CpfCnpj`, `Telefone`, `Email`
- Respostas HTTP coerentes (200/201/204/400/404)

### Estrutura de pastas obrigatoria
- `documentacao/`
- `backend/`
- `frontend/`

### Restricao
- Nao deve haver Docker neste projeto.
