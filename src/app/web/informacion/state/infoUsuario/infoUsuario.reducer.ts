import { Action, createReducer, on } from "@ngrx/store";
import { UsuarioInterface, infoUsuarioInterface } from "src/app/web/informacion/interface/usuario";
import { guardarInfoUsuario } from "./infoUsuario.action";


const estadoInicial: infoUsuarioInterface = {
    area:'',
    extension:'',
    activo:true,
    nombres:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    fechaNacimiento:'',
    genero:'',
    edad:0,
    curp:'',
    rfc:'',
    nss:'',
    numeroTelefonico:0,
    numeroEmpleado:'',
    salario:'',
    puesto:'',
    jefeDirecto:'',
    regimenFiscal:'',
    calle:'',
    numeroExterior:'',
    numeroInterior:'',
    colonia:'',
    municipio:'',
    estado:'',
    codigoPostal:''	
}

const infoUsuarioReducer = createReducer(
    estadoInicial,
    on(guardarInfoUsuario, (state, { infoUsuario }) => {
        return {
            ...state,
            ...infoUsuario
        };
    }),
)

export function reducer(state: infoUsuarioInterface | undefined, action: Action): infoUsuarioInterface {
    return infoUsuarioReducer(state, action);
}