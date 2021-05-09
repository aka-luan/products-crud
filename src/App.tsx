import { Paper, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { ProductsForm } from './Components/ProductsForm';
import { ProductsTable } from './Components/ProductsTable';
import { GlobalStyles } from './Styles/GlobalStyle';
import { ProductsProvider } from './Utils/ProductsContext';
import Modal from 'react-modal'

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  }
}))

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {modalBodyText}
      </Modal>
      <GlobalStyles />
    </>

  );
}
