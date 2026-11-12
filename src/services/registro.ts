    import API_URL from './api';

    export interface RegistroData{
        correo:string;
        nombre:string;
        contrasena:string;
        
    }

    export interface RegistroResponse{
        usuario?:{
            id_usuario:number;
            nombre:string;
            correo:string;
        }
        mensaje?:string;
        message?:string;
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
            // Usamos data.message (que es lo que manda NestJS) o data.mensaje por si acaso
            throw new Error(data.message || data.mensaje || 'Error al registrarse'); 
            }
            return data;
        }
        catch(error:any){
            throw error;
        }
    }