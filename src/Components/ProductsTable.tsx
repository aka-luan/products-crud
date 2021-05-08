import { TableContainer } from '@material-ui/core'
import React, { useContext } from 'react'
import ProductsContext from '../Utils/ProductsContext'
import DataTable from 'react-data-table-component'


/* Criação do componente table */
export function ProductsTable() {

  const { products } = useContext(ProductsContext)

  /* Criação das colunas que são requeridas pelo componente da lib react-data-table-component */
  const columns = [
    {
      name: 'Código SKU',
      selector: 'cod_sku',
      sortable: true
    },
    {
      name: 'Nome',
      selector: 'prod_name',
      sortable: true
    },
    {
      name: 'Preço',
      selector: 'price',
      sortable: true
    },
    {
      name: 'Categoria',
      selector: 'category',
      sortable: true
    }
  ]

  return (
    /* Criação da tabela de produtos utilizado um container da materialUI e a table da lib react-data-table-component*/
    <TableContainer>
      <DataTable 
        title="Tabela de produtos"
        columns={columns}
        data={products.slice(1)}
      />
    </TableContainer>
  );
}