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

export default async function ActualizarPerfil(perfildata:perfilData, token?:string):Promise<PerfilResponse>{
    try{
        const headers: Record<string, string> = {'Content-Type': 'application/json'};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/profile/actualizar-perfil`,{
            method:'PATCH',
            headers,
            body: JSON.stringify({edad:perfildata.edad, peso:perfildata.peso, altura:perfildata.altura, id_usuario:Number(perfildata.id_usuario)})

        });

        if(!res.ok){
            const errorText = await res.text();
            console.error('Error detallado del backend:', errorText);
            throw new Error(`Error del servidor (${res.status}): ${errorText}`);
        }
        const data:PerfilResponse = await res.json();

        return data;
    }   
    catch(error:any){
        console.error('Error al actualizar datos del usuario: ', error);
        throw error;
    }
}