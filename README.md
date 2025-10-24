# Hub de Agentes de API Dinâmicos (Plataforma MCP)

Este repositório contém o código para a Plataforma MCP, uma plataforma web completa que permite a conexão dinâmica a APIs RESTful e bancos de dados PostgreSQL, traduzindo linguagem natural em chamadas de API e queries SQL.

O projeto está configurado como um monorepo usando **npm Workspaces**.

## Estrutura do Projeto

-   `mcp-server/`: O backend da aplicação, construído com [NestJS](https://nestjs.com/).
-   `mcp-client/`: O frontend da aplicação, construído com [React](https://reactjs.org/) e [TypeScript](https://www.typescriptlang.org/).
-   `schemas/`: Contém o JSON Schema para o Dicionário de UI.

## Começando

Existem duas maneiras de rodar este projeto: **Usando Docker (Recomendado)** ou **Manualmente com Node.js**.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) (versão 7 ou superior para suporte a Workspaces)
-   [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para o método recomendado)

---

### Método 1: Rodando com Docker (Recomendado)

Esta é a maneira mais simples de subir todo o ambiente, ideal para produção e desenvolvimento.

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd mcp-platform
    ```

2.  **Configure o Ambiente do Servidor:**

    -   Navegue até `mcp-server/`.
    -   Copie o arquivo de exemplo de ambiente: `cp .env.example .env`.
    -   Edite o arquivo `.env` com suas credenciais de banco de dados e segredos. (Veja a seção de configuração de ambiente abaixo para detalhes).

3.  **Construa e Inicie os Containers:**

    A partir da raiz do projeto, execute:

    ```bash
    docker-compose up --build
    ```

    -   O `mcp-server` estará disponível em `http://localhost:3000`.
    -   O `mcp-client` estará disponível em `http://localhost:3001`.

---

### Método 2: Rodando Manualmente

Use este método se você preferir não usar Docker.

1.  **Instale as Dependências:**

    A partir da raiz do projeto, o npm instalará as dependências para ambos os pacotes:

    ```bash
    npm install
    ```

2.  **Configure o Ambiente do Servidor:**

    -   Siga os mesmos passos de configuração do `.env` do método Docker.

3.  **Inicie as Aplicações:**

    A partir da raiz do projeto, execute o comando `dev`, que iniciará o servidor e o cliente simultaneamente:

    ```bash
    npm run dev
    ```

    -   O `mcp-server` estará disponível em `http://localhost:3000`.
    -   O `mcp-client` estará disponível em `http://localhost:3001`.

### Scripts Unificados

A partir da raiz do projeto, você pode usar os seguintes scripts:

-   `npm run dev`: Inicia o servidor e o cliente em modo de desenvolvimento.
-   `npm run build`: Constrói ambos os projetos para produção.
-   `npm test`: Roda os testes para ambos os projetos.

---

### Debugging e Inspeção com MCP Inspector

Este projeto está integrado com o Model Context Protocol, permitindo que você inspecione os recursos, ferramentas e prompts disponíveis em tempo real.

1.  **Inicie a aplicação** usando um dos métodos acima (Docker ou Manualmente).

2.  Em um novo terminal, execute o seguinte comando:

    ```bash
    npx @modelcontextprotocol/inspector
    ```

3.  O inspetor será aberto no seu navegador, conectado automaticamente ao `mcp-server` em execução. Você deverá ver a ferramenta `server_health_check` que registramos.

---

_Este README será atualizado à medida que novas funcionalidades forem adicionadas._
