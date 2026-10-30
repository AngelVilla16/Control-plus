import API_URL from './api';

export interface GlucosaData{
    glucosa:number | string;
    seleccionado:string;
    id_usuario:number | string;

}

export interface GlucosaResponse{
    id_usuario?: number | string;
    seleccionado?:string;
    glucosa?:number | string;
    mensaje?:string;
}

export default async function RegistrarGlucosa(glucosadata:GlucosaData):Promise<GlucosaResponse>{
    try{
        const res = await fetch(`${API_URL}/registrar-glucosa`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(glucosadata)
        });

        if(!res.ok){
            throw new Error('Error al registrar niveles de glucosa');
        }
        const data:GlucosaResponse = await res.json();
        return data;

    }
    catch(error:any){
        console.error("Error al registrar glucosa");
        throw error;
    }
};

