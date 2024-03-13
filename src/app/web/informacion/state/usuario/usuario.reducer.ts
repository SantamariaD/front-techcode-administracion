import { Action, createReducer, on } from "@ngrx/store";
import { guardarEmpleadoSesion, guardarUsuario } from "./usuario.action";
import { usuarioStore } from "../../interface/usuario";


const estadoInicial: usuarioStore = {} as usuarioStore

const usuarioReducer = createReducer(
    estadoInicial,
    on(guardarUsuario, (state, { usuario }) => {
        return {
            ...state,
            usuario:usuario
            
        };
    }),

    on(guardarEmpleadoSesion, (state, { empleado }) => {
        return {
            ...state,
            empleadoSesion:empleado
            
        };
    }),
    // on(borraUsuario, (state , {}) =>{
    //     return {
    //         ...state,
    //         {}
    //     }
    // })
)

export function reducer(state: usuarioStore | undefined, action: Action): usuarioStore {
    return usuarioReducer(state, action);
}