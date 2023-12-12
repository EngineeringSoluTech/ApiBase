import * as React from 'react';
import { Fragment, useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Modal, Tooltip } from '@mui/material';
import {TextField} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

export default function InsertVideoCode({isOpen,onClose, onSend }) {

    const [videoCode, setVideoCode] = useState('');  // Almacenará el código del usuario

    const handleCodeChange = (event) => {
        setVideoCode(event.target.value);
      }

      const handleSend = () => {
        onSend(videoCode);
        onClose();
    }

     return(        
     <Modal open={isOpen} onClose={onClose}  >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            borderRadius:2,
            p: 2,
            mt:0
          }}
        >
        <TextField
          label="Pega tu código aquí"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          style={{height:"auto"}}
          value={videoCode}
          onChange={handleCodeChange}
        />
        <Grid>
          <Button style={{margin:10}} onClick={handleSend}>Enviar</Button>
          <IconButton onClick={()=>setVideoCode('')}>
            <CancelIcon/>
          </IconButton>
        </Grid>
          <Grid style={{width:'39%', marginLeft:0}}>
               <TextField
                 id="outlined-select-currency"
                 select
                 defaultValue=""
                 style={{width: 200, transform:"scale(1.0)"}}
                 label="Video"
                 margin="normal"
                 name="size"
               //  onChange = {selectSizesShoppingCart}
                 >
                  {/* {
                    product.sizes.map((option) => (
                     <MenuItem key={option} value={option}>
                         {option}
                     </MenuItem>
                      ))
                   } */}
           </TextField>
          </Grid>
        </Box>
      </Modal>
      )
}
