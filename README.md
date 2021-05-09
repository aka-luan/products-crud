Formulário e listagem de produtos (CRUD)
==========================================

Esse aplicativo em React com Typescript realiza um CRUD local para cadastro de produtos.

Para inicializar o app, basta baixa o código fonte e iniciar com um yarn start 

A página possui o componente formulário de criação, que conterá os seguintes campos:

* Código do SKU (int)
* Nome do produto (string)
* Preço (string)
* Categoria (string) -- Tipo select
    * Opções do select: Leite, Doce, Iogurte

A página também possui um componente de tabela que exibe uma tabela com Filtro e Ordenação com as seguintes colunas:

* SKU
* Nome
* Preço
* Categoria
* Ações 
* 
Bibliotecas utilizadas
---------------------------

* *MaterialUI *
* react-data-table-component
* react-hook-form
* mirageJS
* axios
* styled-components (createGlobalStyle)

