import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import { Grid, makeStyles, TextField, MenuItem, Button } from '@material-ui/core'
import { KeyboardBackspace } from '@material-ui/icons'
import { Product, ProductModalProps } from '../Utils/Interfaces'
import { useForm, Controller } from 'react-hook-form'
import ProductsContext from '../Utils/ProductsContext'


const customStyles = {
  content: {
    minWidth: '480px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      display: 'flex',
      margin: theme.spacing(2)
    },
    '& #ViewProductGrid': {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(2)
    }
  }
}))

export function ProductModal({ isOpen, closeModal, row, handleOpenModal }: ProductModalProps) {
  const classes = useStyles();
  const { handleSubmit, control} = useForm<Product>()
  const [isEdit, setIsEdit] = useState(false)
  const original_sku = row.sku

  

  function EditComponent() {
    const { handleEditProduct } = useContext(ProductsContext)

    return (
      <form onSubmit={handleSubmit(async (data: Product) => {
        await handleEditProduct(data, original_sku)
        closeModal()
      })}>
        <Grid container className={classes.root} direction="column" >
          <h2>Editar informações do produto</h2>
          <Grid item xs={12} >
            <Controller
              name="sku"
              control={control}
              defaultValue={String(row.sku)}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Código SKU"
                  variant="outlined"
                  value={value}
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
              defaultValue={row.name}
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
              defaultValue={row.price}
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
              defaultValue={row.category}
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
            <Grid item xs={12} id="ViewProductGrid">
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setIsEdit(false)
                }}
              ><KeyboardBackspace /></Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >Salvar alterações</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

    );
  }

  function ViewComponent() {
    return (
      <Grid container className={classes.root} direction="column" >
        <h2>Informações do Produto</h2>
        <Grid item xs={12}>
          <TextField
            label="Código SKU"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={row.sku}
          />
          <TextField
            label="Nome"
            variant="outlined"
            value={row.name}
          />
          <TextField
            label="Preço em R$"
            variant="outlined"
            value={row.price}
          />
          <TextField
            label="Categoria"
            variant="outlined"
            value={row.category}
          />
        </Grid>
        <Grid item xs={12} id="ViewProductGrid">
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              closeModal()
            }}
          ><KeyboardBackspace /></Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              setIsEdit(true)
            }}
          >Editar Produto</Button>
        </Grid>
      </Grid>

    );
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {isEdit ? <EditComponent /> : <ViewComponent />}

    </Modal>
  );
}