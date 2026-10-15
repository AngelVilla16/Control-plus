import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, ScrollView,
    StyleSheet,
    Image,
    ImageBackground,
    View,
    Text,
    TextInput

} from 'react-native';


export default function Sign(){
    return(
        <KeyboardAvoidingView>
            <ScrollView>
                <ImageBackground>
                    <SafeAreaProvider>
                        <View>
                            <Text>Crea tu cuenta</Text>
                            <Text> Comienza a monitorear tu salud hoy</Text>
                        </View>
                        <View>
                            <View>
                                <Image source={require("../assets/person.png")}/>
                                <TextInput placeholder='Nombre Completo'/>
                            </View>
                            <View>
                                <Image source={require("../assets/mail.png")}/>
                                <TextInput placeholder='Nombre Completo'/>
                            </View>
                        </View>

                    </SafeAreaProvider>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

});
