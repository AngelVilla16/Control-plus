import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home(){
    const [nombre, setNombre] = useState<string>("");
    const [id, setId] = useState<string>("");
    useEffect(()=>{
        const obtenerUsuario = async ()=>{
            try{
                const id_guardado =  await SecureStore.getItemAsync('id_usuario');
                const nombre_guardado:any = await SecureStore.getItemAsync('nombre');

                if(id_guardado !== null){
                    setId(id_guardado);
                    setNombre(nombre_guardado);
                }

            }
            catch(error:any){
                console.error("Error al leer los datos del usuario: ", error);
            }
        };
        obtenerUsuario();
    }, []);

    return(
        <ScrollView>
            <SafeAreaProvider>
                <View>
                    <Text>Bienvenido: {nombre}</Text>
                </View>
            </SafeAreaProvider>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

});