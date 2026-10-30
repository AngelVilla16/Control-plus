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

export default async function RegistrarPresion(presiondata:PresionData):Promise<PresionResponse>{
    try{
        const res = await fetch(`${API_URL}/registrar-presion`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(presiondata)
        });

        if (!res.ok) {
            const texto = await res.text();
            console.log('STATUS:', res.status, 'BODY:', texto);
            throw new Error(`Error ${res.status}: ${texto}`);
        }
        const data:PresionResponse = await res.json();
        return data;
    }
    catch(error:any){
        console.error("Error al registrar presión: ", error);
        throw error;
    }
}