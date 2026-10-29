import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import registrar from '../services/mediciones';

const OPCIONES = ['Ayunas', 'Antes de comer', 'Despues de comer', 'Antes de dormir'];

export default function RegistrarGlucosa(){
    const [abierto, setAbierto] = useState(false);
    const [seleccionado, setSeleccionado] = useState(OPCIONES[0]);
    const [glucosa, setGlucosa] = useState<string>("");
    const [id_usuario, setIdUsuario] = useState<string>('');
    const route = useRouter();

    const obtenerid = async ()=>{
        const id = await SecureStore.getItemAsync('id_usuario');
        if(id !== null){
            setIdUsuario(id);
        }
        else{
            console.error("Error al obtener el id");
        }

    };

    useEffect(()=>{
        obtenerid();
    },[]);

    const handleRegistro = async ()=>{
        try{
            const data:any = await registrar({id_usuario, seleccionado, glucosa});
            Alert.alert(data.mensaje);
            route.replace('/(tabs)/home');
        }
        catch(error:any){
            console.error('Error al registrar glucosa');
            Alert.alert(error.message);
            return;
        }
    }

    return(
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.title}>Registrar Glucosa</Text>
            <View style={styles.head}>
                <TextInput style={styles.input} placeholderTextColor='#4fd1c47f' keyboardType='numeric' placeholder='0' onChangeText={setGlucosa}/>
                <Text style={styles.subheadline}>mg/dL</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>Momento de la medición</Text>
                <View style={styles.combobox}>
                    <TouchableOpacity style={styles.comboboxHeader} onPress={() => setAbierto(!abierto)}>
                        <Text style={styles.comboboxText}>{seleccionado}</Text>
                        <Text style={styles.comboboxArrow}>{abierto ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {abierto && (
                        <View style={styles.comboboxList}>
                            {OPCIONES.map((opcion) => (
                                <TouchableOpacity
                                    key={opcion}
                                    style={styles.comboboxOption}
                                    onPress={() => { setSeleccionado(opcion); setAbierto(false); }}
                                >
                                    <Text style={styles.comboboxOptionText}>{opcion}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.opciones}>
                    <Pressable style={styles.opcionguardar} onPress={handleRegistro}>
                        <Text style={styles.textguardar}>Guardar</Text>
                    </Pressable>
                    <Pressable style={styles.opcioncancelar} onPress={()=> route.replace('/(tabs)/home')}>
                        <Text style={styles.textcancelar}>Cancelar</Text>
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
    },
    subtitle:{
        color:'#1E5F8E',
        fontSize:22,
        fontWeight:'600',

    },
    combobox:{
        marginTop: 12,
        width: '100%',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#4fd1c4',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    comboboxHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 12,
        minHeight: 44,
    },
    comboboxText:{
        color: '#1E5F8E',
        fontSize: 14,
        fontWeight: '600',
    },
    comboboxArrow:{
        color: '#1E5F8E',
        fontSize: 12,
    },
    comboboxList:{
        borderTopWidth: 1,
        borderTopColor: '#4fd1c4',
    },
    comboboxOption:{
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#4fd1c47f',
    },
    comboboxOptionText:{
        color: '#1E5F8E',
        fontSize: 14,
        fontWeight: '500',
    },
    opciones:{
        margin:10,
        alignSelf:'center',
        gap:10,
        paddingTop:180,
        width:'100%',
        textAlign:'center'
    },
    opcionguardar:{
        borderWidth:1,
        width:'100%',
        textAlign:'center',
        padding:3,
        height:40,
        backgroundColor:'#1E5F8E',
        borderRadius:10
    },
    textguardar:{
        textAlign:'center',
        fontSize:20,
        color:'white',
        fontWeight:'bold'
    },
    opcioncancelar:{
        borderWidth:1,
        width:'100%',
        height:40,
        borderRadius:10
    },
    textcancelar:{
        textAlign:'center',
        fontSize:18,
        marginTop:5
    },

});