import React from 'react'
import { Grid, makeStyles, TextField, MenuItem, Button, FormControl } from '@material-ui/core';
import { Product } from '../Utils/Interfaces';
import { FormHandler } from '../Utils/Handlers';
import { useForm, Controller } from 'react-hook-form'


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
  cod_sku: 0,
  prod_name: '',
  price: '',
  category: ''
}

/* Componente do formulário de produtos */

export function ProductsForm() {
  const classes = useStyles()
  const { handleSubmit, control, reset } = useForm<Product>()

  /* chamada do handler para alterar os dados nos inputs, além de chamar a função para realizar o post dos produtos */
  const {
    handleCreateNewProduct
  } = FormHandler();

  return (
    /* Criação dos componentes html utilizando a lib material ui */
    <form className={classes.root} onSubmit={handleSubmit((data: Product) => {
      handleCreateNewProduct(data)
      reset(initialnewProduct)
    })}>
      <div><h2>Formulário de produtos</h2></div>
      <Grid container>
        <Grid item xs={6}>
          <Controller
            name="cod_sku"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Código SKU"
                variant="outlined"
                value={value === 0 ? '' : value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: 'Código SKU obrigatório' }}
          />

          <Controller
            name="prod_name"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Nome"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: 'Nome do produto obrigatório' }}
          />
          <Controller
            name="price"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Preço em R$"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: 'Preço do produto obrigatório' }}
          />
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Categoria"
                variant="outlined"
                select
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              >
                <MenuItem value={'Leite'}>Leite</MenuItem>
                <MenuItem value={'Doce'}>Doce</MenuItem>
                <MenuItem value={'Iogurte'}>Iogurte</MenuItem>
              </TextField>
            )}
            rules={{ required: 'Categoria do produto requerida' }}
          />
          <FormControl className={classes.buttonContainer}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                reset(initialnewProduct)
              }}
            >Limpar</Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
            >Salvar</Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}