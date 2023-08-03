//todo: personalizar los mesanjes de error.

import { DIC_ERRORS, ERRORS_CODES_FIREBASE } from './';



export const TYPE_ERRORS = (error) => {

    let errorMessage;

    if(error.code === ERRORS_CODES_FIREBASE.PASSWORD_INCORECTA) {
        return  errorMessage = DIC_ERRORS.ERROR_PASSWORD_INCORRECTO 
        
    }else if(error.code === ERRORS_CODES_FIREBASE.USUARIO_NO_ENCONTRADO) {
        return errorMessage = DIC_ERRORS.ERROR_CORREO_NO_EXISTE
        
    }else if(error.code === ERRORS_CODES_FIREBASE.CORREO_EN_USO) {
        return errorMessage = DIC_ERRORS.ERROR_CORREO_EN_USO

    } else{
        return errorMessage = error.code
        
    }

    return console.log(errorMessage); 
}