import { useContext } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

import { GlobalStoreContext } from '../store'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const closeBtnStyle = {
    marginTop: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function RenamePlaylistErrorModal() {
    const { store } = useContext(GlobalStoreContext);
    let warningMsg = "";

    if (store.warningMsg){
        console.log("has Err Msg");
        warningMsg = store.warningMsg;
    }

    function handleCloseModal(event) {
        event.stopPropagation();
        store.clearWarningMsg();
    }

    return (
        <Modal
            open={store.warningMsg !== null}
        >
            <Box sx={style}>
                <Alert severity="warning">
                    <AlertTitle><strong>Warning</strong></AlertTitle>
                    {warningMsg}<br/>
                </Alert>
                
                <Button
                    variant="contained" color="warning"
                    style={closeBtnStyle}
                    onClick={handleCloseModal}
                >
                    Ok!
                </Button>
            </Box>
        </Modal>
    );
}