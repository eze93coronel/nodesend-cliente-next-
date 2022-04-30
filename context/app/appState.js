import React,{useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer'
 
import {MOSTRAR_ALERTA,LIMPIAR_ALERTAS,  SUBIR_ARCHIVO_EXITO,SUBIR_ARCHIVO_ERROR,CREAR_ENLACE_EXITO,CREAR_ENLACE_ERROR} from '../../types'

 const AppState = ({children})=>{
   
    const initialState = {
        mensaje_archivo :null,
    }

    
    //crear dispatch y state 
    const [ state, dispatch] = useReducer(appReducer,initialState)




    //MOSTRAR UNA ALERTA  

    const mostrarAlerta = msg =>{
        console.log(msg)
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        }),
         
        setTimeout(() =>{
          dispatch({
              type :LIMPIAR_ALERTAS,
          })
        },6000)
    }


        return (
              <appContext.Provider
                 value={{
                     mensaje_archivo : state.mensaje_archivo,
                     mostrarAlerta
                 }}
              >
                  {children}
              </appContext.Provider>
        )
 }; 

 export default AppState;