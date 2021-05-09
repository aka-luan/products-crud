import React, { useContext } from 'react'
import ProductsContext from '../Utils/ProductsContext'
import { TableContainer, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import DataTable from 'react-data-table-component'
import { Product, ProductFormsProps } from '../Utils/Interfaces'


/* Criação do componente table */
export function ProductsTable({ handleOpenModal }: ProductFormsProps) {

  const { products, handleRemoveProduct } = useContext(ProductsContext)


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
    },
    {
      name: 'Ações',
      cell: (row: Product) => <IconButton aria-label="delete" onClick={() => {
        handleRemoveProduct(row.cod_sku)
        handleOpenModal('Produto removido com sucesso!')
        }}>
        <DeleteIcon />
      </IconButton>,
      button: true
    }
  ]

  return (
    /* Criação da tabela de produtos utilizado um container da materialUI e a table da lib react-data-table-component*/
    <TableContainer>
      <div><h2>Tabela de produtos</h2></div>
      <DataTable
        noHeader
        defaultSortField="cod_sku"
        defaultSortAsc={false}
        pagination
        highlightOnHover  
        title="Tabela de produtos"
        columns={columns}
        data={products.slice(1)}
      />
    </TableContainer>
  );
}