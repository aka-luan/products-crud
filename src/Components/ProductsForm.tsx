import React from 'react'
import { Grid, makeStyles, TextField, MenuItem, Button, FormControl } from '@material-ui/core';
import { Product } from '../Utils/Interfaces';
import { FormHandler } from '../Utils/Handlers';


/* Adiciona estilo aos componentes com classe .MuiFormControl-root e ao container do botão*/
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      justify: 'center',
      width: '50%',
      margin: theme.spacing(1)
    },
  },
  buttonContainer: {
    display: 'block',
    '& Button': {
      width: '46.25%',
      margin: theme.spacing(1)
    }
  }
}))

/* Valores iniciais do form */
const initialnewProduct: Product = {
  cod_sku: '',
  prod_name: '',
  price: '',
  category: ''
}

/* Componente do formulário de produtos */

export function ProductsForm() {
  const classes = useStyles()


  /* chamada do handler para alterar os dados nos inputs, além de chamar a função para realizar o post dos produtos */
  const {
    newProduct,
    setNewProduct,
    changeInputValue,
    handleCreateNewProduct
  }=FormHandler(initialnewProduct);

  return (
    /* Criação dos componentes html utilizando a lib material ui */
    <form className={classes.root}>  
    <div><h2>Formulário de produtos</h2></div>
      <Grid container>            
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Código SKU"
            name="cod_sku"
            value={newProduct.cod_sku}
            onChange={e => changeInputValue(e)}
          />
          <TextField
            variant="outlined"
            label="Nome do produto"
            name="prod_name"
            value={newProduct.prod_name}
            onChange={e => changeInputValue(e)}
          />
          <TextField
            variant="outlined"
            label="Preço em R$"
            name="price"
            value={newProduct.price}
            onChange={e => changeInputValue(e)}
          />
          <TextField
            label="Categoria"
            variant="outlined"
            select
            name="category"
            value={newProduct.category}
            onChange={e => changeInputValue(e)}
          >
              <MenuItem value={'Leite'}>Leite</MenuItem>
              <MenuItem value={'Doce'}>Doce</MenuItem>
              <MenuItem value={'Iogurte'}>Iogurte</MenuItem>
          </TextField> 
          <FormControl className={classes.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => handleCreateNewProduct(newProduct)}
          >Cadastrar</Button>
          <Button 
            variant="contained"
            size="large"
            onClick={() => setNewProduct(initialnewProduct)}
          >Limpar</Button>
          </FormControl>                  
        </Grid>
      </Grid>
    </form>
  );
}