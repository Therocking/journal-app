import { firestoreDB } from '../../../src/firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from '../../../src/store/journal';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite';


describe('Pruebas en thunks de journal', () => {
  const dispacth = jest.fn();
  const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks());

    test('startNewNote debe de crear una nota en blanco', async() => {
      
        const uid = 'TEST-UID';
        getState.mockReturnValue({auth: { uid }});

        await startNewNote()(dispacth, getState);
        
        const emtyNote = {
            body: '',
            tittle: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imgURLs: []
        }

        expect( dispacth ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispacth ).toHaveBeenCalledWith( addNewEmptyNote(emtyNote) );
        expect( dispacth ).toHaveBeenCalledWith( setActiveNote(emtyNote) );
    
        const collectionRef = collection( firestoreDB, `${uid}/journal/notes` );
        const docs = await getDocs(collectionRef);

        const deletePromise = [];
        docs.forEach( doc => deletePromise.push( deleteDoc(doc.ref) ) );
        await Promise.all( deletePromise )
    });
    
})
