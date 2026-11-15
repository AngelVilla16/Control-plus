import API_URL from './api';

export interface PerfilResponse{
    edad?:number;
    peso?:number;
    altura?:number;
    mensaje?:string;
    correo?:string;
}


export default async function GetPerfil(token:string ):Promise<PerfilResponse>{
    try{
        const headers:Record<string, string> = {'Content-Type': 'application/json'};

        if(token){
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/profile/datos-perfil`,{
            method:'GET',
            headers,
           
        })
        if(!res.ok){
            const errorText = await res.text();
            console.error('Error detallado del backend:', errorText);
            throw new Error(`Error del servidor (${res.status}): ${errorText}`);
        }
        const data_usuario:PerfilResponse = await res.json();
        return data_usuario;
    }
    catch(error:any){
        console.error('Error al obtener el perfil:', error);
        throw error;
    }
}