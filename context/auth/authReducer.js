import { REGISTRO_ERROR, REGISTRO_EXITOSO,LIMPIAR_ALERTAS } from "../../types";

export default (state , action) =>{
    switch(action.type){
    case REGISTRO_EXITOSO :
        case REGISTRO_ERROR :
        return{
            ...state,
            mensaje: action.payload
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