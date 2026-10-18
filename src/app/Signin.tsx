import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
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
import Registro from '../services/registro';

export default function Sign() {
    const route = useRouter();
    const [nombre, setNombre] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");

    const handleRegistro = async ()=>{
        try{
            const data:any = await Registro({nombre, correo, contrasena});
            Alert.alert(data.mensaje);
            route.push('/');
        }
        catch(error){
            console.error("Error al registrar: ", error);
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
                            <Text style={styles.title}>Crea tu cuenta</Text>
                            <Text style={styles.subtitle}>Comienza a monitorear tu salud hoy</Text>
                        </View>
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/person.png')} style={styles.icon} />
                                <TextInput placeholder="Nombre Completo" style={styles.input} onChangeText={setNombre} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/mail.png')} style={styles.icon} />
                                <TextInput autoCapitalize='none' placeholder="Correo electrónico" style={styles.input} 
                                    onChangeText={setCorreo}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/lock.png')} style={styles.icon} />
                                <TextInput autoCapitalize='none' placeholder="Contraseña" secureTextEntry style={styles.input} 
                                    onChangeText={setContrasena}
                                />
                            </View>
                            <Pressable style={styles.button} onPress={handleRegistro}>
                                <Text style={styles.buttonText}>Registrarse</Text>
                            </Pressable>
                            <Pressable style={styles.linkButton}
                                onPress={()=>route.push("/")}
                            >
                                <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
        color:'#1E5F8E',
    },
});
