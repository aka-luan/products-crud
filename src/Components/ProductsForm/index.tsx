import React, { useContext } from 'react'
import { Grid, TextField, MenuItem, Button, FormControl } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { Product, ProductFormsProps } from '../../Utils/Interfaces'
import ProductsContext from '../../Utils/ProductsContext'
import { useStyles } from './styles'


/* Componente do formulário de produtos */

export function ProductsForm({ handleOpenModal }: ProductFormsProps) {
  const classes = useStyles()

  const { handleSubmit, control, reset } = useForm<Product>()
  const { handleAddProduct } = useContext(ProductsContext)

  return (
    
    /* Criação dos componentes html utilizando a lib material ui */
    <form className={classes.root} onSubmit={handleSubmit(async (data: Product) => {
      await handleAddProduct(data) !== false ? reset({sku: NaN, name: '', price: '', category: ''}) : handleOpenModal('O Código SKU inserido já existe. Insira outro código.')

    })}>
      <div><h2>Formulário de produtos</h2></div>
      <Grid container>
        <Grid item xs={6}>
          <Controller
            name="sku"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Código SKU"
                variant="outlined"
                value={isNaN(value) ? '' : value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: 'Código SKU obrigatório' }}
          />

          <Controller
            name="name"
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
                reset({sku: NaN, name: '', price: '', category: ''})
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