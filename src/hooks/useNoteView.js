import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './useForm';

import { setActiveNote, startDeleteNote, startNoteSaved, startUploadingFiles } from '../store/journal';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


export const useNoteView = () => {
    
    const dispatch = useDispatch()

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    
    const { tittle, body, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo( () => {
        
        const newDate = new Date( date );
        
        return newDate.toUTCString()
    }, [date] );

    const fileInputRef = useRef()

    useEffect(() => {
       
        dispatch( setActiveNote(formState) )
    }, [formState]);

    useEffect(() => {

      if( messageSaved.length > 0 ) {
        Swal.fire('Nota actualizada!!', `${ messageSaved }`, 'success',)
      }
    }, [messageSaved])
    
    
    const onSaveNote = () => {

        dispatch( startNoteSaved() )
    };

    const onFileChange = ({target}) => {

        if(target.files === 0) return

        dispatch( startUploadingFiles(target.files) )
    };

    const onDeleteNote = () => {

        dispatch( startDeleteNote() )
    }

    return {
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
    }

}
