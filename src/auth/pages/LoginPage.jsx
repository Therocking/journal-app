import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { startLoginWithEmailPassword, statrGoogleSignIn } from '../../store/auth';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';

const formData = {
  email: '',
  password: '',
};

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @.' ],
  password: [ (value) => value.length >= 6, 'El passwor debe de tener mas de 6 caracteres.' ],
};

export const LoginPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth );

  const isAuthenticating = useMemo( () => status === 'checking', [status] )

  const dispatch = useDispatch();

  const { 
    email, password, onInputChange, formState,
    emailValid, passwordValid 
  } = useForm(formData, formValidations);
  
  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    
    if( email.length === 0 || password.length < 0 ) return

    dispatch( startLoginWithEmailPassword(formState) )

    
  }

  const onGoogleSignIn = () => {
    
    dispatch( statrGoogleSignIn() )

  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name = 'email'
                value = { email }
                onChange = { onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ (!formSubmitted) ? '' : emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name = 'password'
                value = { password }
                onChange = { onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ (!formSubmitted) ? '' : passwordValid }
              />
            </Grid>

              <Grid 
                  container 
                  spacing={ 2 } 
                  sx={{ mb: 2, mt: 1 }}
                  display = { !!errorMessage ? '' : 'none' }
                >
                  <Grid 
                    item 
                    xs={ 12 }
                  >
                      <Alert severity='error'> { errorMessage } </Alert>
                  </Grid>
                </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                  disabled = { isAuthenticating }
                  type='submit' 
                  variant='contained' 
                  fullWidth
                  >
                  Login
                </Button>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  disabled = { isAuthenticating }
                  onClick = { onGoogleSignIn }
                  variant='contained'  
                  fullWidth
                 >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>


            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
