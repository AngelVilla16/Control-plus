import API_URL from './api';

export interface PresionData{
    sistolica:number | string;
    diastolica:number | string;
    seleccionado:string;
    id_usuario:number | string;

}

export interface PresionResponse{
    id_usuario?: number | string;
    seleccionado?:string;
    sistolica?:number | string;
    diastolica?:number | string;
    mensaje?:string;
}

export default async function RegistrarPresion(presiondata:PresionData, token?:string):Promise<PresionResponse>{
    try{
        const headers: Record<string, string> = {'Content-Type': 'application/json'};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/mediciones/registrar-presion`,{
            method:'POST',
            headers,
            body:JSON.stringify(presiondata)
        });

        if(!res.ok){
            const errorText = await res.text();
            const parsed = JSON.parse(errorText);
            let mensaje = parsed?.message ?? errorText;
            throw new Error(` ${mensaje}`);
        }
        const data:PresionResponse = await res.json();
        return data;
    }
    catch(error:any){
        console.error("Error al registrar presión: ", error);
        throw error;
    }
}