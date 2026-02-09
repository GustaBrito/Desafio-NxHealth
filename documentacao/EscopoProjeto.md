Escopo do Projeto - Desafio NxHealth (CRUD de Pessoas)

Este documento resume o escopo do desafio de forma organizada, como pretendo implementar.

1) Objetivo do desafio

Construir um Cadastro de Pessoas com React no frontend e ASP.NET Core Web API no backend, permitindo ao usuario listar, criar, editar e excluir registros de pessoas.

A palavra CRUD aqui e literal:
Create: cadastrar pessoa
Read: listar pessoas (e buscar uma pessoa para editar)
Update: editar pessoa
Delete: excluir pessoa

2) Funcionalidades exigidas

2.1 Listagem de Pessoas (Tela de Lista)

O que pedem:
Exibir usuarios cadastrados em tabela responsiva
Cada linha mostra no minimo: Nome e CPF/CNPJ
Cada linha tem acoes: Editar e Excluir

Projeto:
Rota/pagina /pessoas
Backend: GET /api/pessoas
Front: tabela Bootstrap (table, table-responsive)
Botoes por linha:
Editar: navega para /pessoas/:id/editar (ou abre formulario na mesma rota)
Excluir: abre modal de confirmacao

Detalhe importante:
"No minimo" = posso exibir Telefone/E-mail tambem, mas Nome e CPF/CNPJ sao obrigatorios.

2.2 Cadastro de Pessoas (Tela de Cadastro)

O que pedem:
Formulario para adicionar pessoa usando componentes de formulario
Campos obrigatorios:
Nome Completo
CPF/CNPJ
Telefone
E-mail
Ao submeter com sucesso: redirecionar para listagem

Projeto:
Rota /pessoas/nova
Backend: POST /api/pessoas
Validacoes minimas: nao aceitar payload invalido; retornar 400 com erros
Front:
Form Bootstrap (form-control, row, col)
Ao salvar com sucesso (201/200), executar navigate("/pessoas")

Detalhe que geralmente pegam na avaliacao:
Tratamento de erro de API no front com feedback no form (ex.: "CPF invalido", "E-mail invalido"), mesmo que basico.

2.3 Edicao de Pessoas (Tela de Edicao)

O que pedem:
Clicar em "Editar" leva a um formulario preenchido com os dados
Salvar alteracoes redireciona para listagem

Projeto:
Rota /pessoas/:id/editar
Backend:
GET /api/pessoas/{id} para carregar dados do form
PUT /api/pessoas/{id} (ou PATCH) para atualizar
Front:
Componente PessoaForm reutilizavel
Modo create: valores vazios + POST
Modo edit: carrega dados + PUT

Detalhe comum de bug:
Garantir que o form so renderiza preenchido depois do GET (loading state).

2.4 Exclusao de Pessoas (Modal de confirmacao)

O que pedem:
Ao clicar "Excluir", abrir modal de confirmacao para evitar exclusao acidental
Confirmando, remover a pessoa da lista

Projeto:
Front:
Modal Bootstrap controlado por estado (pessoa selecionada)
Confirmar -> chama API de delete
Backend:
DELETE /api/pessoas/{id} retorna 204 No Content (padrao)

Depois do delete:
Ou refazer GET /api/pessoas
Ou remover do state local (mais rapido)

Detalhe avaliado:
Nao excluir sem confirmacao (modal e obrigatorio).

3) Requisitos tecnicos (stack obrigatoria)

Frontend
React obrigatorio
Bootstrap obrigatorio (estilizacao)
Interface responsiva

O que isso significa na pratica:
Usar classes do Bootstrap para layout (grid, breakpoints, tabela responsiva, modal)
Rodar como SPA (React Router e o caminho natural)

Backend
C# obrigatorio
ASP.NET Core Web API obrigatorio
Dependencias via NuGet

Observacao importante:
O PDF nao exige banco especifico nem menciona EF Core explicitamente. Entao e possivel:
usar EF Core + SQLite/InMemory (muito comum)
ou usar lista em memoria (menos recomendado, mas possivel)
O que tende a pontuar melhor: persistencia minima (SQLite) + migrations.

4) O que sera avaliado 

Estrutura do projeto
Pastas bem organizadas (front e back separados, camadas no back)
Componentes reutilizaveis no React

Qualidade do codigo
Legibilidade, nomes bons, padroes
Boas praticas: validacao, tratamento de erro, evitar gambiarra

Controle de versao (Git)
Commits pequenos e descritivos

Seguimento dos requisitos
Entregar exatamente: listagem + cadastro + edicao + exclusao com modal
React + Bootstrap + ASP.NET Core

5) O que entregar (entregaveis obrigatorios)

Link de repositorio publico GitHub/GitLab com o codigo
README.md bem escrito contendo:
seu nome
breve descricao do projeto
instrucoes claras para rodar

Comandos esperados:
Backend: dotnet restore, dotnet run
Frontend: npm install, npm start

6) Telas de referencia (o que isso significa)

As telas do PDF sao apenas inspiracao. Nao precisa replicar igual; criatividade e bem-vinda.

Traducao pratica:
Posso melhorar o layout, mas nao posso fugir do escopo do CRUD.
Criatividade que ajuda: feedbacks, loading, empty state, validacoes, mascara de CPF/CNPJ, etc.

7) Checklist final do que PRECISA existir

Front (React + Bootstrap)
Pagina de lista com tabela responsiva (Nome + CPF/CNPJ + acoes)
Pagina/rota de criar pessoa com form (Nome, CPF/CNPJ, Telefone, E-mail)
Pagina/rota de editar com o mesmo form preenchido (carrega pessoa)
Exclusao com modal Bootstrap de confirmacao
Redirecionar para listagem apos create e update

Back (ASP.NET Core Web API)
Endpoints CRUD:
GET /api/pessoas
GET /api/pessoas/{id}
POST /api/pessoas
PUT /api/pessoas/{id}
DELETE /api/pessoas/{id}
Model/DTO com: NomeCompleto, CpfCnpj, Telefone, Email
Respostas HTTP coerentes (200/201/204/400/404)

Entrega
Repositorio publico
README com seu nome + descricao + como rodar (dotnet e npm)
