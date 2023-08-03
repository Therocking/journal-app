export const initialState = {
    status: 'checking', // cheking, no-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
} 
export const authenticatedState = {
    status: 'authenticated', // cheking, no-authenticated, authenticated
    uid: '123789',
    email: 'demo@gmail.com',
    displayName: 'demo',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
} 
export const noAuthenticatedState = {
    status: 'no-authenticated', // cheking, no-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
} 
export const userDemo = {
    uid: '123789',
    email: 'demo@gmail.com',
    displayName: 'demo',
    photoURL: 'https://demo.jpg',
} 