import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RegistrarGlucosa(){
    return(
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.title}>Registrar Glucosa</Text>
            <View style={styles.head}>
                <TextInput style={styles.input} placeholderTextColor='#4fd1c47f' keyboardType='numeric' placeholder='180'/>
                <Text style={styles.subheadline}>mg/dL</Text>
            </View>
            <View>
                <Text>Momento de la medición</Text>
                <View>
                    <TouchableOpacity>
                        <Text>Ayunas</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text>Antes de comer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>Despues de comer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>Antes de dormir</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Pressable>
                        <Text>Guardar</Text>
                    </Pressable>
                    <Pressable>
                        <Text>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container:{
      padding:16,
      flex:1,
        
    },
    title:{
        fontSize:24,
        marginTop:30,
        textAlign:'center',
        color:'#1E5F8E',
        fontWeight:'bold',

    },
    head:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
    },
     input:{
         color:'#1E5F8E',
         fontSize:40,
         textAlign:'center'
     },
     subheadline:{
        color:'#1E5F8E',
        fontSize:20,
        fontWeight:'600',
        marginBottom:20,
     }
});