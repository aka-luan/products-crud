import { Paper, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { ProductsForm } from './Components/ProductsForm';
import { ProductsTable } from './Components/ProductsTable';
import { GlobalStyles } from './Styles/GlobalStyle';
import { ProductsProvider } from './Utils/ProductsContext';
import Modal from 'react-modal'
import { GenericModal } from './Components/GenericModal';

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
  const [modalBodyText, setModalBodyText] = useState<string>('lorem ipsum')
  
  function openModal(text: string) {
    setModalBodyText(text)
    setIsModalOpen(true);
  }

  function closeModal(){
    setIsModalOpen(false);
  }  

  return (
    <>
      <ProductsProvider>
        <Paper className={classes.pageContent}  >
          <ProductsForm handleOpenModal={openModal} />
        </Paper>
        <Paper className={classes.pageContent}  >
          <ProductsTable handleOpenModal={openModal}/>
        </Paper>
      </ProductsProvider>
      <GenericModal 
        isOpen={isModalOpen}
        closeModal={closeModal}
        text={modalBodyText}        
      />
      <GlobalStyles />
    </>

  );
}
