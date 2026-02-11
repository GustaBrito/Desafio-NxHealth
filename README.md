# Desafio NxHealth - Cadastro de Pessoas

## Nome

Gustavo Adra Grizinsky de Brito

## Descricao do projeto

Aplicacao de cadastro de pessoas com CRUD completo, utilizando frontend em React com Bootstrap e backend em ASP.NET Core Web API com C#.

## Funcionalidades exigidas (atendidas)

- Listagem de pessoas em tabela responsiva.
- Exibicao minima por linha: Nome e CPF/CNPJ, com acoes de Editar e Excluir.
- Cadastro de pessoa com campos obrigatorios: Nome Completo, CPF/CNPJ, Telefone e E-mail.
- Edicao de pessoa com formulario preenchido a partir dos dados existentes.
- Redirecionamento para listagem apos criar e apos editar.
- Exclusao com modal de confirmacao antes de remover da lista.

## Implementacoes extras

- Arquitetura em camadas no backend (Controller, Service, Repository, DTO e Model).
- Persistencia com Entity Framework Core e migrations.
- Tratamento de erro de API no frontend com mapeamento para campos do formulario.
- Validacoes e mascaras de campos (CPF/CNPJ, Telefone, CEP, UF e E-mail).
- Busca, ordenacao e paginacao visual na listagem.
- Componentes reutilizaveis (`PessoaForm`, `PessoasTable`, `ConfirmModal`).

## Banco de dados (SQLite)

Foi utilizado SQLite por ser uma opcao leve, sem custo de licenciamento e de setup simples, adequada para projetos de teste e demonstracao. Ele permite persistencia real de dados com baixo overhead e facilita a avaliacao do CRUD em ambiente local.

## Como instalar e executar localmente

## Backend

```bash
cd backend/NxHealth.Api
dotnet restore
dotnet run
```

## Frontend

```bash
cd frontend/nxhealth-web
npm install
npm start
```
