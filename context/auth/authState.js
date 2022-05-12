import React, {useReducer} from 'react';
import authContext from './authContext'
import authReducer from './authReducer'
import {REGISTRO_EXITOSO, REGISTRO_ERROR,LIMPIAR_ALERTAS,LOGIN_ERROR,LOGIN_EXISTOSO,USUARIO_AUTENTICADO,CERRAR_SECION} from '../../types'

import  clienteAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children})=> {
//DEFINE UN STATE INICIAL 
  const initialState ={
      token : typeof window !== 'undefined' ? localStorage.getItem('token') : '',
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

 //autenticar usuario 
 const iniciarSesion = async datos => {
   try {
     const respuesta = await clienteAxios.post('/api/auth',datos)
     console.log(respuesta)
     dispatch({
       type: LOGIN_EXISTOSO,
       payload : respuesta.data.token
     })
   } catch (error) {
    
     dispatch({
       type: LOGIN_ERROR,
       payload: error.response.data.msg
     })
   }
   // LIMPIA LAS ALERTAS
   setTimeout(()=>{
    dispatch({
      type: LIMPIAR_ALERTAS
    })
  },3000)
 }

  const usuarioAutenticadoJWS = async () =>{
     const token = localStorage.getItem('token');
     if(token){
       tokenAuth(token);
     }
     try {
       const respuesta = await clienteAxios.get('/api/auth');
       if(respuesta.data.usuario){
        dispatch({
          type : USUARIO_AUTENTICADO,
          payload : respuesta.data.usuario
        })
       }
    

     } catch (error) {
         
     dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.msg
    })
     }
  };

  // funcion parar cerar la secion 
 const cerrarSesion = ()=>{
   console.log('desde cerrar secion');
   dispatch({
     type: CERRAR_SECION
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
            iniciarSesion,
            usuarioAutenticado,
            usuarioAutenticadoJWS,
            cerrarSesion

          }}
        
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;