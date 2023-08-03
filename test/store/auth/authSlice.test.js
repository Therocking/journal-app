import { authSlice, chekingCredencials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, noAuthenticatedState, userDemo } from "../../fixtures/authFixture"


describe('Pruebas en authSlice', () => {

    test('debe de regresar el estado inical', () => {
      
        const state = authSlice.reducer( initialState, {} );

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('debe de realizar la autenticacion', () => {
      
        const state = authSlice.reducer( initialState, login( userDemo ) )

        expect( state ).toEqual( authenticatedState )
    });
    
    test('debe de realizar el logout sin argumento', () => {
        const state = authSlice.reducer( authenticatedState, logout() );

        expect( state ).toEqual( {
            status: 'no-authenticated', // cheking, no-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null || undefined,
        }  )
    });

    test('debe de realizar el logout con argumento', () => {
        const errorMessage = 'error'

        const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );

        expect( state ).toEqual( {
            status: 'no-authenticated', // cheking, no-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage,
        });
    });

    test('debe de cambiar es estado a checking', () => {
      
        const state = authSlice.reducer( authenticatedState, chekingCredencials);

        expect( state.status ).toBe( 'checking' )
    })
    
    
    
})
