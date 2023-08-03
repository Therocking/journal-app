export const journalInitialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const fixtureSavingNewNote = {
    isSaving : true
}
export const fixtureClearJournal = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const fixtureAddNewEmptyNote = {
    active: null,
    messageSaved: '',
    notes: [],
    isSaving: false
}

export const emptyNote = {
    tittle: '',
    body: '',
    date: new Date().getTime(),
    imgURLs: []        
};

