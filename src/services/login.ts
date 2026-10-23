import API_URL from "./api";
export interface LoginData{
    correo:string;
    contrasena:string;
}

export interface LoginResponse{
    mensaje?:string;
    correo?:string;
    contrasena?:string;
    id_usuario?:number | string;
    perfil_completo?:Boolean;
}

export default async function login(userData:LoginData): Promise<LoginResponse>{
    try{
        const res = await fetch(`${API_URL}/auth/login`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        });

        const data:LoginResponse = await res.json();
        
        if(!res.ok){
            throw new Error(data.mensaje);
        }
        return data;
    }
    catch(error:any){
        throw error;
    }
}