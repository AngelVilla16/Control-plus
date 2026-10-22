import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function CompletarPerfil(){


    return(
        <SafeAreaProvider>
            <View>
                <Modal>
                    <Text>Para completar su perfil, requeriremos un par de datos adicionales</Text>
                    <View>
                        <Text> Edad: </Text>
                        <TextInput keyboardType='numeric'/>
                        <Text>Peso: (kg) </Text>
                        <TextInput keyboardType='numeric'/>
                        <Text>Altura: (M)</Text>
                        <TextInput keyboardType='numeric'/>
                    </View>
                    <Pressable>
                        <Text>Confirmar Datos</Text>
                    </Pressable>
                </Modal>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({

    modal:{

    },
    container:{
        flex:1,
        padding:20,
    }

});