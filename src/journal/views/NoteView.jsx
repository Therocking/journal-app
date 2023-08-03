import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'

import { useNoteView } from '../../hooks';

export const NoteView = () => {

    const { 
        body,
        dateString,
        fileInputRef,
        isSaving,
        note,
        onDeleteNote,
        onFileChange,
        onInputChange,
        onSaveNote,
        tittle,
    } = useNoteView()
    
  return (
    <Grid
        className='animate__animated animate__fadeIn animate__faster' 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        
        <Grid item>

            <input 
                type='file'
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={ onFileChange }
            />

            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={ () => {
                    fileInputRef.current.click();
                    onSaveNote
                }}
            >
                <UploadOutlined/>
            </IconButton>

            <Button
                disabled={ isSaving }
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name='tittle'
                value={tittle}
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={body}
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDeleteNote }
                sx={{ mt: 2 }}
                color='error'
            >
                <DeleteOutline/>
                Borrar
            </Button>

        </Grid>

        {/* Image gallery */}
        <ImageGallery 
            imgs={ note.imgURLs }
        />

    </Grid>
  )
}
