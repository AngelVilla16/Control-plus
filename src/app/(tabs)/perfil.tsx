import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Perfil(){
    const nombre = 'Angel';
    const correo = 'Correo@ejemplo.com';
    return(
        <SafeAreaProvider>
            <View>
                <Text>{nombre}</Text>
                <Text>{correo}</Text>
            </View>
            <View>
                <Text>Mis datos</Text>
                <Text>Edad actual:</Text>
                <Text>Peso actual:</Text>
                <Text>Altura actual:</Text>
            </View>
            <View>
                <Text>Actualizar datos</Text>
            </View>
        </SafeAreaProvider>
    );
}