import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from '../services/login';

export default function HomeScreen() {
    const route = useRouter();
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");

    const handleLogin = async ()=>{
        try{
            
            const data:any = await Login({correo, contrasena});
            const id = data.id_usuario;
            const nombre = data.nombre;
            const perfil = data.perfil_completo;
            await SecureStore.setItemAsync('id_usuario', String(id));
            await SecureStore.setItemAsync('nombre', String(nombre));
           
            if(perfil === 0){
                route.push('/CompletarPerfil');
            }
            else{
                route.replace('/(tabs)/home');
                await SecureStore.setItemAsync('perfil', String(perfil));
            }
            
        }
        catch(error:any){
            console.error("Error al iniciar sesión: ", error);
            setMensaje(error.message || "Error al iniciar sesión");
          
        }    
    }

    return (
        <KeyboardAvoidingView
            style={styles.key}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <ImageBackground
                source={require('../assets/background-log.png')}
                resizeMode="cover"
                style={styles.background}
                imageStyle={styles.imageStyle}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <SafeAreaProvider style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Bienvenido de vuelta</Text>
                            <Text style={styles.subtitle}>Continúa tu control de salud</Text>
                        </View>
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/mail.png')} style={styles.icon} />
                                <TextInput autoCapitalize='none' placeholder="Correo electrónico" style={styles.input} onChangeText={setCorreo} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/lock.png')} style={styles.icon} />
                                <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} autoCapitalize='none' onChangeText={setContrasena}  />
                            </View>
                            {mensaje && <View style={styles.labelcontainer}> <Text style={styles.label}>{mensaje}</Text> </View>}
                            <Pressable style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Iniciar sesión</Text>
                            </Pressable>
                            <Pressable style={styles.linkButton}
                                       onPress={()=> route.push("/Signin")}
                            >
                                <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
                            </Pressable>
                        </View>
                    </SafeAreaProvider>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    key: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        gap: 32,
    },
    header: {
        gap: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
    },
    icon: {
        width: 20,
        height: 20,
    },
    input: {
        flex: 1,
        height: 40,
    },
    button: {
        backgroundColor: '#1E5F8E',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    linkButton: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    linkText: {
        fontSize: 16,
        color:"#1E5F8E"
    },
    labelcontainer:{
        borderWidth:1,
        borderColor:'red',
        alignSelf:'center',
        alignContent:'center',
        width:280,
        borderRadius:5,
        backgroundColor:'#FF7A6C'
    },
    label:{
      textAlign:'center',
      fontSize:16,
      color:'white'
    }
});
