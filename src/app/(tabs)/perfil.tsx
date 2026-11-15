import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GetPerfil from '../../services/getperfil';
import ActualizarPerfil from '../../services/updateperfil'; // Asegúrate de tener esta ruta correcta

export default function Perfil(){
    const [nombre, setNombre] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [edad, setEdad] = useState<number>(0);
    const [peso, setPeso] = useState<number>(0);
    const [altura, setAltura] = useState<number>(0);

    // Estados para controlar qué campo se está editando
    const [editandoEdad, setEditandoEdad] = useState<boolean>(false);
    const [editandoPeso, setEditandoPeso] = useState<boolean>(false);
    const [editandoAltura, setEditandoAltura] = useState<boolean>(false);

    const getdatos = async()=>{
        try{
            const token: any = await SecureStore.getItemAsync('user_token');
            const data = await GetPerfil(token);
            const nombre_guardado: any = await SecureStore.getItemAsync('nombre');
            
            setNombre(nombre_guardado || '');
            setCorreo(data.correo || '');
            setEdad(data.edad || 0);
            setPeso(data.peso || 0);
            setAltura(data.altura || 0);
        }
        catch(error: any){
            console.error('Error al obtener el perfil del usuario: ', error);
        }
    };

    // Función para guardar los cambios en el backend
    const handleGuardarCambios = async () => {
        try {
            const token = await SecureStore.getItemAsync('user_token');
            const id_usuario = await SecureStore.getItemAsync('id_usuario');

            if (!token || !id_usuario) return;

            await ActualizarPerfil({
                id_usuario,
                edad,
                peso,
                altura
            }, token);

            // Desactivar todos los modos de edición
            setEditandoEdad(false);
            setEditandoPeso(false);
            setEditandoAltura(false);

            alert('Datos actualizados con éxito');
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('No se pudieron actualizar los datos');
        }
    };

    useEffect(()=>{
        getdatos();
    },[]);

    return(
        <SafeAreaProvider style={styles.container}>
            <View style={styles.containerHead}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{(nombre || '?').charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={styles.title}>{nombre}</Text>
                <Text style={styles.subtitle}>{correo}</Text>
            </View>

            <Text style={styles.sectionTitle}>Mis datos</Text>
            
            <View style={styles.content}>
                {/* EDAD */}
                <View style={styles.datacontainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Edad actual</Text>
                        {editandoEdad ? (
                            <TextInput
                                style={styles.input}
                                value={String(edad)}
                                onChangeText={(text) => setEdad(Number(text))}
                                keyboardType="numeric"
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.value}>{edad} años</Text>
                        )}
                    </View>
                    <Pressable onPress={() => setEditandoEdad(!editandoEdad)}>
                        <Image style={styles.icon} source={require('../../assets/edit.png')}/>
                    </Pressable>
                </View>

                {/* PESO */}
                <View style={styles.datacontainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Peso actual</Text>
                        {editandoPeso ? (
                            <TextInput
                                style={styles.input}
                                value={String(peso)}
                                onChangeText={(text) => setPeso(Number(text))}
                                keyboardType="numeric"
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.value}>{peso} kg</Text>
                        )}
                    </View>
                    <Pressable onPress={() => setEditandoPeso(!editandoPeso)}>
                        <Image style={styles.icon} source={require('../../assets/edit.png')}/>
                    </Pressable>
                </View>

                {/* ALTURA */}
                <View style={styles.datacontainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Altura actual</Text>
                        {editandoAltura ? (
                            <TextInput
                                style={styles.input}
                                value={String(altura)}
                                onChangeText={(text) => setAltura(Number(text))}
                                keyboardType="numeric"
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.value}>{altura} m</Text>
                        )}
                    </View>
                    <Pressable onPress={() => setEditandoAltura(!editandoAltura)}>
                        <Image style={styles.icon} source={require('../../assets/edit.png')}/>
                    </Pressable>
                </View>
            </View>

            <Pressable style={styles.btn} onPress={handleGuardarCambios}>
                <Text style={styles.btnText}>Actualizar datos</Text>
            </Pressable>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F7FA',
        padding:16,
    },
    containerHead:{
        alignItems:'center',
        paddingBottom:20,
        borderBottomWidth:1,
        borderBottomColor:'#E5E7EB',
        marginBottom:20,
    },
    avatar:{
        width:72,
        height:72,
        borderRadius:36,
        backgroundColor:'#1E5F8E',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:12,
    },
    avatarText:{
        color:'#FFFFFF',
        fontSize:30,
        fontWeight:'bold',
    },
    title:{
        color:'#1E5F8E',
        fontSize:22,
        fontWeight:'700',
        textAlign:'center',
    },
    subtitle:{
        color:'#9c9d9e',
        fontSize:14,
        fontWeight:'500',
        marginTop:4,
    },
    sectionTitle:{
        color:'#1E5F8E',
        fontSize:18,
        fontWeight:'700',
        marginBottom:12,
        marginLeft:4,
    },
    content:{
        backgroundColor:'#FFFFFF',
        borderRadius:16,
        padding:16,
        gap:16,
        shadowColor:'#000',
        shadowOffset:{ width:0, height:2 },
        shadowOpacity:0.08,
        shadowRadius:6,
        elevation:3,
        marginBottom:24,
    },
    label:{
        color:'#9c9d9e',
        fontSize:13,
        fontWeight:'500',
    },
    value:{
        color:'#1E5F8E',
        fontSize:18,
        fontWeight:'700',
        marginTop:2,
    },
    input: {
        color: '#1E5F8E',
        fontSize: 18,
        fontWeight: '700',
        borderBottomWidth: 1,
        borderBottomColor: '#1E5F8E',
        paddingVertical: 2,
        marginTop: 2,
    },
    icon: {
        width: 22,
        height: 22,
        tintColor:'#1E5F8E',
    },
    datacontainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:4,
        borderBottomWidth:1,
        borderBottomColor:'#F0F2F5',
    },
    btn:{
        width:'100%',
        alignItems:'center',
        height:48,
        borderRadius:12,
        backgroundColor:'#4FD1C5',
        justifyContent:'center',
    },
    btnText:{
        fontSize:16,
        fontWeight:'600',
        color:'#FFFFFF',
    },
});