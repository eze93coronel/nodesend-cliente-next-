import {REGISTRO_ERROR, REGISTRO_EXITOSO,LIMPIAR_ALERTAS,LOGIN_ERROR,LOGIN_EXISTOSO,USUARIO_AUTENTICADO,CERRAR_SECION} from "../../types";

export default (state , action) =>{
    switch(action.type){
    case REGISTRO_EXITOSO :
     case REGISTRO_ERROR :
    case LOGIN_ERROR: 
        return{
            ...state,
            mensaje: action.payload
        }
        case LOGIN_EXISTOSO :
            localStorage.setItem('token',action.payload) 
        return{ ...state,
            token : action.payload,
            autenticado : true
        }
        case USUARIO_AUTENTICADO : 
        return { ...state,
                 usuario : action.payload,
                 autenticado : true
        }
        case CERRAR_SECION :
            localStorage.removeItem('token')  
        return { ...state,
               token : null,
               autenticado : null,
               usuario : null
        }
        case LIMPIAR_ALERTAS :
        return{
            ...state,
            mensaje : null
        }
      
        default:
            return state;
    }
}