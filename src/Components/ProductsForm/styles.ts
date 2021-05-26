import { makeStyles } from "@material-ui/core";
import styled from 'styled-components'


/* Adiciona estilo aos componentes com classe .MuiFormControl-root e ao container do botão*/
export const useStyles = makeStyles(theme => ({
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

export const Form = styled.form`
  
`;