import React, { useContext, useState } from 'react'
import ProductsContext from '../Utils/ProductsContext'
import { TableContainer, IconButton, Grid, TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import DataTable from 'react-data-table-component'
import { Product, ProductFormsProps } from '../Utils/Interfaces'
import { Edit, Search } from '@material-ui/icons'

/* Criação do componente table */
export function ProductsTable({ handleOpenModal }: ProductFormsProps) {

  const { products, handleRemoveProduct } = useContext(ProductsContext)
  const [ filteredProducts, setFilteredProducts ] = useState<Product[]>([])


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
    },
    {
      name: 'Ações',
      cell: () => <IconButton>
        <Edit />
      </IconButton>,
      button: true
    }
  ]

  function filterItems(e: string) {
    const filtered = products.filter(product => {
      return product.prod_name && product.prod_name.toLowerCase().includes(e.toLowerCase())
    })
    setFilteredProducts(filtered)
  }

  return (
    /* Criação da tabela de produtos utilizado um container da materialUI e a table da lib react-data-table-component*/
    <TableContainer>
      <div><h2>Tabela de produtos</h2></div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Search color="primary"/>
        </Grid>
        <Grid item>
          <TextField id="input-with-icon-grid" label="Procurar pelo nome" onChange={e => filterItems(e.target.value)} />
        </Grid>
      </Grid>
      <DataTable
        noHeader
        noDataComponent={<h3>Sem dados a serem mostrados</h3>}
        defaultSortField="cod_sku"
        defaultSortAsc={false}
        pagination
        highlightOnHover
        title="Tabela de produtos"
        columns={columns}
        data={filteredProducts.length === 0 ? products.slice(1) : filteredProducts}
      />
    </TableContainer>
  );
}