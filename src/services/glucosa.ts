import API_URL from './api';

export interface GlucosaData{
    id_usuario: number | string;
    tipo:string;
    glucosa:number | string;
    seleccionado:string;

    

}

export interface GlucosaResponse{
    id_usuario?: number | string;
    seleccionado?:string;
    glucosa?:number | string;
    mensaje?:string;
}
export interface DataResponse{
    momento?:string;
    id?:string | number;
    glucosa?:number | string;
    fecha?: string;
    mensaje?:string;
}

export async function RegistrarGlucosa(glucosadata:GlucosaData, token?: string):Promise<GlucosaResponse>{
    try{
        const headers: Record<string, string> = {'Content-Type': 'application/json'};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/mediciones/registrar-glucosa`,{
            method:'POST',
            headers,
            body:JSON.stringify({glucosa:Number(glucosadata.glucosa), seleccionado: glucosadata.seleccionado })
        });

        if(!res.ok){
            const errorText = await res.text();
            console.error('Error detallado del backend:', errorText);
            throw new Error(`Error del servidor (${res.status}): ${errorText}`);
        }
        const data:GlucosaResponse = await res.json();
        return data;

    }
    catch(error:any){
        console.error("Error al registrar glucosa");
        throw error;
    }
};

export async function ObtenerGlucosa(token: string): Promise<DataResponse[]> {
    try {
        const res = await fetch(`${API_URL}/historial-glucosa`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const body = await res.text();
            console.error('ObtenerGlucosa failed', res.status, body);
            throw new Error('Error al obtener glucosa');
        }

        const data: DataResponse[] = await res.json();
        return data;
    } catch (error: any) {
        console.log("Error al obtener glucosa: ", error);
        throw error;
    }
}
