import API_URL from './api';


export interface perfilData{
    id_usuario:number | string;
    edad:number;
    peso:number;
    altura:number;
}

export interface PerfilResponse{
    id_usuario:number | string;
    edad?:number;
    peso?:number;
    altura?:number;
    mensaje?:string;
    perfil_completo?:boolean;
}

export default async function ActualizarPerfil(perfildata:perfilData):Promise<PerfilResponse>{
    try{

        const res = await fetch(`${API_URL}/actualizar-perfil`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(perfildata)

        });

        if(!res.ok){
            throw new Error('Error al actualizar el perfil');
        }
        const data:PerfilResponse = await res.json();

        return data;
    }   
    catch(error:any){
        console.error('Error al actualizar datos del usuario: ', error);
        throw error;
    }
}