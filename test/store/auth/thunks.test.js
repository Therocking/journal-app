import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from '../../../src/firebase/provider';
import { chekingCredencials, login, logout } from '../../../src/store/auth/authSlice';
import { chekingAuthentication, startCreatingUserWithEmailPassword, startLoginWithEmailPassword, startLogout, statrGoogleSignIn } from '../../../src/store/auth/thunks'
import { clearJournal } from '../../../src/store/journal/journalSlice';
import { userDemo } from '../../fixtures/authFixture';

jest.mock('../../../src/firebase/provider');

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
  
    test('debe de invocar el chekingCredencials', async() => {

        await chekingAuthentication()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(chekingCredencials())
    });

    test('startGoogleSignIn debe de checkinCredencials y login - exito', async() => {
      
        const loginData = { ok: true, ...userDemo };
        await signInWithGoogle.mockResolvedValue(loginData)
    
        await statrGoogleSignIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
    });

    test('startGoogleSignIn debe de checkinCredencials y logout - Error', async() => {
      
        const loginData = { ok: false, errorMessage:'un error' };
        await signInWithGoogle.mockResolvedValue(loginData)

        await statrGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });
    

    test('startLoginWithEmailPassword debe de checkinCredencials y login - exito', async() => {
       const loginData = { ok: true, ...userDemo};
       const formData = { email: userDemo.email, password: '1245755787'};

       await loginWithEmailPassword.mockResolvedValue( loginData );

       await startLoginWithEmailPassword(formData)(dispatch)
  
       expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
       expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
    });

    test('startLoginWithEmailPassword debe de checkinCredencials y loguot - error', async() => {
       const loginData = { ok: false, ...userDemo};
       const formData = { email: userDemo.email, password: '1245755787'};

       await loginWithEmailPassword.mockResolvedValue( loginData );

       await startLoginWithEmailPassword(formData)(dispatch)
  
       expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
       expect( dispatch ).toHaveBeenCalledWith( logout(loginData) );
    });


    test('startCreatingUserWithEmailPassword debe de checkinCredencials y login - exito', async() => {
      const loginData = {ok: true, ...userDemo};
      const formData = { email: userDemo.email, displayName: userDemo.displayName, password: '123456' };

      await registerWithEmailPassword.mockResolvedValue(loginData);

      await startCreatingUserWithEmailPassword(formData)(dispatch);

      expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
      expect( dispatch ).toHaveBeenCalledWith( login( {...userDemo} ) );
    });

    test('startCreatingUserWithEmailPassword debe de checkinCredencials y logout - error', async() => {
      const loginData = {ok: false, errorMessage: 'hubo un error'};
      const formData = { email: userDemo.email, displayName: userDemo.displayName, password: '123456' };

      await registerWithEmailPassword.mockResolvedValue(loginData);

      await startCreatingUserWithEmailPassword(formData)(dispatch);

      expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
      expect( dispatch ).toHaveBeenCalledWith( logout( {errorMessage: 'hubo un error'} ) );
    });
    
    test('startLogout debe de llamar logoutFirebase, clearJournal, logout', async() => {
      
      await startLogout()(dispatch);
      
      expect( logoutFirebase ).toHaveBeenCalled()
      expect( dispatch ).toHaveBeenCalledWith( clearJournal() )
      expect( dispatch ).toHaveBeenCalledWith( logout() )
    })
    
    
})
