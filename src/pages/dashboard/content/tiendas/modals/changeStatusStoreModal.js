import React, {useEffect, useState} from 'react'
import { 
    Box, 
    Grid, 
    Typography,
    Button, 
    Modal, 
    TextField, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl,
    Alert
} from '@mui/material';
import { LoadingButton, DatePicker, LocalizationProvider, TimePicker  } from '@mui/lab';

import axios from "../../../../../auth/fetch"
import Loader from '../../../../../components/Loader/Loader';
import ModalDirection from '../../citas/ModalDirection';
import ImageUploader from './imageUploader';
import { toast } from 'react-toastify';

const style = {
    width: "95%",
    margin: "auto",
    maxWidth: "450px",
    backgroundColor: "#fff",
    userSelect: "none",
    boxShadow: 'none',
};

function ChangeStatusStoreModal({ 
    show = false, 
    handleShowModal = (show) => {}, 
    reset = () => {}, 
    store = null,
    active = false
}){
    
    const [sending, setsending] = useState(false);

    const changeStatus = () => {
        const url = '/admin/store/Edit';
        let data = store;

        if(active){
            data['isActived'] = false;
        }else{
            data['isActived'] = true;
        }

        setsending(true);

        axios.put(url, data).then((res) => {

            console.log(res.data);
            setsending(false);
            reset();
            toast.success('Tienda modificada satisfactoriamente!');
            handleShowModal(false);

        }).catch((err) => {

            console.error(err);
            toast.error('Ha ocurrido un error inesperado');
            setsending(false);
        });
    }
    
    return (
        <Modal     
            open={show}
            onClose={() => handleShowModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{ 
                display:'flex', 
                alignItems:'center', 
                justifyContent:'center',
                zIndex: 1200
            }}
            
        >
            <Box sx={{...style, p: 5, borderRadius: 2}}>
                <Typography variant="h5" alignItems="center" textAlign="center" sx={{mb: 3}}>
                    {active ? `Desactivar tienda` : `Activar tienda`}
                </Typography>
                
                {active ? 
                    <Typography alignItems="center" textAlign="center" sx={{mb: 3}}>
                        ¿Desea desactivar esta tienda?
                    </Typography>
                :
                    <Typography alignItems="center" textAlign="center" sx={{mb: 3}}>
                        ¿Desea activar esta tienda?
                    </Typography>
                }

                <Box display="flex" justifyContent="center">
                    <LoadingButton 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        sx={{pmx: 1, py: 1.5}}
                        onClick={() => changeStatus()}
                        loading={sending}
                        disabled={sending}
                    >
                        {active ? `Desactivar` : `Activar`}
                    </LoadingButton>
                    <Button 
                        disabled={sending} 
                        size="large" 
                        sx={{mx: 1}} 
                        onClick={() => handleShowModal(false)}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ChangeStatusStoreModal