import API_URL from './api';

export interface RegistroData{
    correo:string;
    nombre:string;
    contrasena:string;
    
}

export interface RegistroResponse{
    correo?:string;
    nombre?:string;
    contrasena?:string;
    mensaje?:string;
}

export default async function Registro(userData: RegistroData): Promise<RegistroResponse>{
    try{
        const res = await fetch(`${API_URL}/auth/registro`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(userData)
        });

        const data:RegistroResponse = await res.json();

        if(!res.ok){
            throw new Error(data.mensaje); 
        }
        return data;
    }
    catch(error:any){
        throw error;
    }
}