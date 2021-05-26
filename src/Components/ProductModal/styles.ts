import { makeStyles } from "@material-ui/core";

export const customStyles = {
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

export const useStyles = makeStyles(theme => ({
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