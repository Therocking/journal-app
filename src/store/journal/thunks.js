import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { firestoreDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './';
import { loadNotes } from '../../helper/loadNotes';
import { fileUpload } from '../../helper/fileUpload';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            tittle: '',
            body: '',
            date: new Date().getTime(),
            imgURLs: []        
        };

        const newDoc = doc( collection(firestoreDB, `${uid}/journal/notes`) );
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        //! Dispatch
        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );
    }
};


export const startLoadNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        if(!uid) throw new Error('El uid del usuario no existe.');

        
        dispatch( setNotes(await loadNotes(uid) ) )
    }
};

export const startDeleteNote = () => {
    return async(dispatch, getState) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        const docRef = doc( firestoreDB, `${uid}/journal/notes/${note.id}` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) )
        
        // console.log(state);
    }
}

export const startNoteSaved = () => {
    return async(dispatch, getState) => {

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirebase = { ...note }
        delete noteToFirebase.id;

        const docRef = doc( firestoreDB, `${uid}/journal/notes/${note.id}` );
        await setDoc( docRef, noteToFirebase, { merge: true } );

        dispatch( updateNote( note ) )

    }
};

export const startUploadingFiles = ( files = [] ) => {
    return async(dispatch) => {
        dispatch( setSaving );

        // await fileUpload( files );
        const filesUploadPromises = [];

        for(const file of files) {
            filesUploadPromises.push( fileUpload( file ) );
        };

        const photos = await Promise.all( filesUploadPromises );

        dispatch( setPhotosToActiveNote( photos ) );
    }
}