import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
    Image,
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
            <SafeAreaProvider style={styles.container}>
                <View>
                    <Text>Bienvenido: {nombre}</Text>
                    <Text> Mejores numeros, mejor salud. </Text>
                </View>
                <View>
                    <View>
                        <Image source={require('../../assets/drop.png')}/>
                        <Text>Glucosa</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/ecg.png')}/>
                        <Text> MMHG</Text>
                    </View>
                </View>
                <View>
                    <Text>Ultimas Mediciones</Text>
                </View>
            </SafeAreaProvider>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    }
});