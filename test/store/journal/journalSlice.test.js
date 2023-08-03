import { addNewEmptyNote, journalSlice } from '../../../src/store/journal/journalSlice'
import { fixtureAddNewEmptyNote, fixtureClearJournal, emptyNote, journalInitialState } from '../../fixtures/journalFixture';


describe('Pruebas en journal slice', () => {
  
    test('debe devolver el incialState', () => {
      const state = journalSlice.reducer(journalInitialState, {});

      expect(state).toEqual(journalInitialState);
      expect(journalSlice.name).toBe('journal');
    });
    
    test('debe devolver isSaving en false', () => {
      const state = journalSlice.reducer(fixtureClearJournal, {});

      expect(state).toEqual(fixtureClearJournal);
    });

    test('debe devolver una nota vacia', () => {
      fixtureAddNewEmptyNote.notes.push(emptyNote)
        
      const state = journalSlice.reducer(journalInitialState, addNewEmptyNote(emptyNote));

      expect(state.notes).toContain(emptyNote);
      expect(state).toEqual(fixtureAddNewEmptyNote);
    });
    
})
