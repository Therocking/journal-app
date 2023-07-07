import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onAuthStateChanged }  from 'firebase/auth'
import { firebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';

export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
  
    const dispacth = useDispatch()

    useEffect(() => {
     onAuthStateChanged( firebaseAuth, async(user) => {
      if( !user ) return dispacth( logout() );
  
      const { email, uid, photoURL, displayName } = user
  
      dispacth( login( { email, uid, photoURL, displayName } ) );
  
     });
    }, [])

    return status
  
}
