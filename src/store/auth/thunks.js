import { chekingCredencials, login, logout } from './authSlice'
import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from '../../firebase/provider'
import { clearJournal } from '../journal/journalSlice'

export const chekingAuthentication = () => {
    return async( dispatch ) => {

        dispatch( chekingCredencials() )
    }
}

export const statrGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( chekingCredencials() )
        
        const result = await signInWithGoogle(); 

        if( !result.ok ) return dispatch( logout( result.errorMessage ) )

        dispatch( login( result ) )
    }

};

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async( dispatch ) => {
        dispatch( chekingCredencials() )

        const { uid, photoURL, ok, errorMessage } = await registerWithEmailPassword({email, password, displayName})

        if( !ok ) return dispatch( logout( {errorMessage} ) )
        
        dispatch( login( { uid, photoURL, email, displayName } ) )
    };
};

export const startLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {
        dispatch( chekingCredencials() )

        const result = await loginWithEmailPassword({email, password});

        if(!result.ok) return dispatch( logout( result ) );

        dispatch( login( result ) );
    }
};

export const startLogout = () => {
    return async( dispatch ) => {

        try {
            
            await logoutFirebase();

            dispatch(clearJournal())
            dispatch( logout() );
        } catch (error) {
            const typeError = `ERROR:${error} CODE:${error.code}`;
            console.log( typeError );
        }
    }
};

