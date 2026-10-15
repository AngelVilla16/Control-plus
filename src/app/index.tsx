import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, ScrollView,
    StyleSheet,
    Image,
    ImageBackground,
    View,
    Text,
    TextInput,
    Pressable

} from 'react-native';


export default function HomeScreen(){
  return(
    <KeyboardAvoidingView>
        <ScrollView>
            <ImageBackground>
                <SafeAreaProvider>
                    <View>
                        <Text>Bienvenido de vuelta</Text>
                        <Text> Continúa tu control de salud</Text>
                    </View>
                    <View>
                        <View>
                            <Image source={require("../assets/mail.png")}/>
                            <TextInput placeholder='Correo electrónico'/>
                        </View>
                        <View>
                            <Image source={require("../assets/lock.png")}/>
                            <TextInput placeholder='Contraseña'/>
                        </View>
                        <Pressable>
                            <Text>Iniciar sesión</Text>
                        </Pressable>
                        <Pressable>
                            <Text>¿No tienes cuenta? Regístrate</Text>
                        </Pressable>
                    </View>

                </SafeAreaProvider>
            </ImageBackground>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

});
