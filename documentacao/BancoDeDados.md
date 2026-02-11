# Banco de Dados - NxHealth

## Visao geral

O projeto usa **SQLite** como banco relacional local, com acesso via **Entity Framework Core**.
O arquivo do banco e criado em runtime com a connection string:

- `Data Source=nxhealth.db`

Essa escolha foi feita por ser leve, sem custo de licenca e facil de executar em ambiente de teste/demonstracao.

## Estrutura atual

Tabela principal:

- `Pessoas`

Colunas:

- `Id` - `INTEGER` - PK - autoincrement
- `NomeCompleto` - `TEXT` - obrigatorio - max 150
- `TipoPessoa` - `TEXT` - obrigatorio - max 30
- `CpfCnpj` - `TEXT` - obrigatorio - max 18
- `Telefone` - `TEXT` - obrigatorio - max 20
- `Email` - `TEXT` - obrigatorio - max 120
- `Cep` - `TEXT` - obrigatorio - max 9
- `Endereco` - `TEXT` - obrigatorio - max 150
- `Logradouro` - `TEXT` - obrigatorio - max 120
- `Bairro` - `TEXT` - obrigatorio - max 120
- `Cidade` - `TEXT` - obrigatorio - max 120
- `Uf` - `TEXT` - obrigatorio - max 2

Indice:

- `IX_Pessoas_CpfCnpj` - unico (nao permite CPF/CNPJ duplicado)

## Regras relevantes no backend

- O service normaliza `CpfCnpj` para apenas digitos antes de salvar.
- Quando ocorre violacao de unicidade de `CpfCnpj`, a API retorna `409 Conflict`.
- O contrato de entrada da API segue os mesmos campos obrigatorios persistidos no banco.

## Migrations

Migration aplicada:

- `20260211003418_InitialSqlite`

A aplicacao executa `Database.Migrate()` no startup, garantindo criacao/atualizacao do schema automaticamente.

## Fluxo recomendado em ambiente local

1. Subir a API com `dotnet run`.
2. A migration e aplicada automaticamente.
3. Validar o arquivo `nxhealth.db` na raiz do projeto backend em tempo de execucao.
