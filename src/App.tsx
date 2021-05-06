import { Paper, makeStyles } from '@material-ui/core';
import React from 'react';
import { ProductsForm } from './Components/ProductsForm';
import { ProductsTable } from './Components/ProductsTable';
import { GlobalStyles } from './Styles/GlobalStyle';
import { ProductsProvider } from './Utils/ProductsContext';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  }
}))

export function App() {

  const classes = useStyles()
  return (
    <>
      <ProductsProvider>
        <Paper className={classes.pageContent}  >
          <ProductsForm />
        </Paper>
        <Paper className={classes.pageContent}  >
          <ProductsTable />
        </Paper>
      </ProductsProvider>
      <GlobalStyles />
    </>

  );
}
