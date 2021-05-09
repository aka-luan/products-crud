import React, { useContext, useState } from 'react'
import ProductsContext from '../Utils/ProductsContext'
import { TableContainer, IconButton, Grid, TextField, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Search } from '@material-ui/icons'
import DataTable from 'react-data-table-component'
import { Product, ProductTableProps } from '../Utils/Interfaces'

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'visible',
  }
}))

/* Criação do componente table */
export function ProductsTable({ handleOpenModal, handleOpenProductModal }: ProductTableProps) {
  const classes = useStyles()

  const { products, handleRemoveProduct } = useContext(ProductsContext)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])


  /* Criação das colunas que são requeridas pelo componente da lib react-data-table-component */
  const columns = [
    {
      name: 'Código SKU',
      selector: 'sku',
      sortable: true
    },
    {
      name: 'Nome',
      selector: 'name',
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
      cell: (row: Product) =>

        <IconButton aria-label="delete" onClick={() => {
          handleRemoveProduct(row.sku)
          handleOpenModal('Produto removido com sucesso!')
        }}>
          <DeleteIcon />
        </IconButton>,
      button: true
    }
  ]

  function filterItems(e: string) {
    const filtered = products.filter(product => {
      return product.name && product.name.toLowerCase().includes(e.toLowerCase())
    })
    setFilteredProducts(filtered)
  }

  return (
    /* Criação da tabela de produtos utilizado um container da materialUI e a table da lib react-data-table-component*/
    <TableContainer className={classes.root}>
      <div><h2>Tabela de produtos</h2></div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Search color="primary" />
        </Grid>
        <Grid item>
          <TextField id="input-with-icon-grid" label="Procurar pelo nome" onChange={e => filterItems(e.target.value)} />
        </Grid>
      </Grid>
      <DataTable
        noHeader
        noDataComponent={<h3>Sem dados a serem mostrados</h3>}
        defaultSortField="sku"
        defaultSortAsc={false}
        pagination
        highlightOnHover
        onRowClicked={handleOpenProductModal}
        title="Tabela de produtos"
        columns={columns}
        data={filteredProducts.length === 0 ? products.slice(1) : filteredProducts}
      />
    </TableContainer>
  );
}