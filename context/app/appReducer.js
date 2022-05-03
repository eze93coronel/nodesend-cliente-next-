import {SUBIR_ARCHIVO,  MOSTRAR_ALERTA,SUBIR_ARCHIVO_EXITO,SUBIR_ARCHIVO_ERROR,CREAR_ENLACE_EXITO,CREAR_ENLACE_ERROR,LIMPIAR_ALERTAS} from '../../types'


export default (state,action) =>{
  switch(action.type){
      case MOSTRAR_ALERTA :
          return {
              ...state,
              mensaje_archivo : action.payload
          }
          case LIMPIAR_ALERTAS :
              return {
                  ...state,
                  mensaje_archivo : null
              }
     case SUBIR_ARCHIVO : 
     return {
         ...state,
         cargando : true,
     }

  case SUBIR_ARCHIVO_EXITO :
      return {
          ...state,
          nombre : action.payload.nombre,
          nombre_original: action.payload.nombre_original,
         cargando : null,
      }
      case SUBIR_ARCHIVO_ERROR : 
      return {
          ...state,
          payload : action.payload,
          cargando : null,
      }
      case CREAR_ENLACE_EXITO : 
      return {
          ...state,
         url : action.payload
      }

      default:
          return state
  }
}