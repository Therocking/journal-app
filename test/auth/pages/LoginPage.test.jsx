import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { authSlice } from '../../../src/store/auth'
import { LoginPage } from '../../../src/auth/pages/LoginPage'


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
});

describe('Pruebas en <LoginPage/>', () => {
  test('debe de mostrar el componente correctamente', () => {
    
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </Provider>
    )

    // screen.debug();
  });
  
})
