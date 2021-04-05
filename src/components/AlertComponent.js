import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars() {
    const error     = useSelector(state => state.error)
    const dispatch  = useDispatch()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({
            type    : 'CLEAR_ERROR',
        })
    };

    return (
        <Snackbar 
            anchorOrigin={{ vertical : 'top', horizontal: 'center' }}
            open={!!error} 
            autoHideDuration={6000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={error?.severity ?? 'error'}>
            {error?.message}
            </Alert>
        </Snackbar>
    );
}