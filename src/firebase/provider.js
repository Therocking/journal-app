import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from './config';
import { TYPE_ERRORS } from '../errors';
// import { DIC_ERRORS } from '../errors/errors';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {

        const result = await signInWithPopup( firebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log(credentials);

        const { uid, displayName, email, photoURL } = result.user;

        return {
            ok: true,
            uid, 
            displayName, 
            email, 
            photoURL
        }

    } catch (error) {

        return {
            ok: false,
            errorMessage: TYPE_ERRORS(error)
        };
    };
};

export const registerWithEmailPassword = async({email, password, displayName}) => {

    try {

        const resp = await createUserWithEmailAndPassword( firebaseAuth, email, password )
        const {uid, photoURL} = resp.user;

        await updateProfile( firebaseAuth.currentUser, {displayName} );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        
        return {
            ok: false,
            errorMessage: TYPE_ERRORS(error) //error del correo
        };
    };
};

export const loginWithEmailPassword = async({email, password}) => {

    try {

        const resp = await signInWithEmailAndPassword( firebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        // console.log(error.code);

        return {
            ok: false,
            errorMessage: TYPE_ERRORS(error),
        };
    }
}

export const logoutFirebase = async() => {
    return firebaseAuth.signOut();
}