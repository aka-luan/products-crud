import { Paper, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { GlobalStyles } from './Styles/GlobalStyle'
import Modal from 'react-modal'
import { ProductsForm } from './Components/ProductsForm'
import { ProductsTable } from './Components/ProductsTable'
import { GenericModal } from './Components/GenericModal'
import { ProductModal } from './Components/ProductModal'
import { ProductsProvider } from './Utils/ProductsContext'
import { Product } from './Utils/Interfaces'

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  }
}))

Modal.setAppElement('#root')

export function App() {

  const classes = useStyles()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [modalBodyText, setModalBodyText] = useState<string>('')
  const [modalRow, setModalRow] = useState<Product>({} as Product)

  function openGenericModal(text: string) {
    setModalBodyText(text)
    setIsModalOpen(true)
  }

  function openProductModal(row: Product) {
    setModalRow(row)
    setIsProductModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false);
    setIsProductModalOpen(false);
  }

  return (
    <>
      <ProductsProvider>
        <Paper className={classes.pageContent}  >
          <ProductsForm handleOpenModal={openGenericModal} />
        </Paper>
        <Paper className={classes.pageContent}  >
          <ProductsTable handleOpenModal={openGenericModal} handleOpenProductModal={openProductModal} />
        </Paper>
        <GenericModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          text={modalBodyText}
        />
        <ProductModal
          isOpen={isProductModalOpen}
          closeModal={closeModal}
          row={modalRow}
          handleOpenModal={openGenericModal}
        />
      </ProductsProvider>
      <GlobalStyles />
    </>

  );
}
