# Teste Técnico Backend Nimbus

Este é um projeto de backend para uma aplicação de gerenciamento de alertas climáticos.

## Pré-requisitos

- Node.js
- npm ou yarn
- Um banco de dados PostgreSQL

## Configuração Inicial

Clone o repositório para sua máquina local usando `git clone`, depois navegue até o diretório do projeto.

Instale as dependências necessárias com `npm install`.

## Configuração do Banco de Dados

Defina a string de conexão do banco de dados no arquivo `.env` na raiz do projeto:

`DATABASE_URL="sua_string_de_conexao_com_o_banco_de_dados"`

Criação e popular do banco de dados

`npm run setup`

## Iniciar o projeto

`npm start`

exemplo de requisição

`http://localhost:3333/damage-summary-by-date?dateStart=2013-12-24&dateEnd=2013-12-25`

## Testes

`npm test`