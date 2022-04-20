import React, {useReducer} from 'react';
import authContext from './authContext'
import authReducer from './authReducer'
import {REGISTRO_EXITOSO, REGISTRO_ERROR,LIMPIAR_ALERTAS} from '../../types'

import  clienteAxios from '../../config/axios'

const AuthState = ({children})=> {
//DEFINE UN STATE INICIAL 
  const initialState ={
      token : '',
      autenticado : null,
      usuario : null,
      mensaje : null,
  }

//DEFINE UN REDUCER hook
 const [state, dispatch] = useReducer(authReducer,initialState);
 
 // funcion para registrar un ususraio 
 const registrarUsuario = async datos => {
     try {
       const respuesta = await clienteAxios.post('/api/usuarios', datos);
       dispatch({
         type : REGISTRO_EXITOSO,
         payload : respuesta.data.msg
       });

     } catch (error) {
     //  console.log(error.response.data.msg)
       dispatch({
         type : REGISTRO_ERROR,
         payload : error.response.data.msg
       })
     };

        //LIMPIA LA ALERTA DESPUES DE 3 SEG
        setTimeout(()=>{
        dispatch({
          type: LIMPIAR_ALERTAS
        })
      },3000)

}

 const usuarioAutenticado =(nombre) => {
       dispatch({
           type: USUARIO_AUTENTICADO,
           payload : nombre
       })
 }

    return (
        <authContext.Provider
          value={{
            token : state.token,
            autenticado : state.autenticado,
            usuario : state.usuario,
            mensaje : state.mensaje,
            registrarUsuario,
            usuarioAutenticado

          }}
        
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;