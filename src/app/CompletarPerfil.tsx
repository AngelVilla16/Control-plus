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
        <SafeAreaProvider style={styles.container}>
            <View>
                <Modal style={styles.modal}>
                    <Text style={styles.title}>Para completar su perfil, requeriremos un par de datos adicionales</Text>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}> Edad: </Text>
                        <TextInput style={styles.modalInput} keyboardType='numeric'/>
                        <Text style={styles.modalText}>Peso: (kg) </Text>
                        <TextInput style={styles.modalInput} keyboardType='numeric'/>
                        <Text style={styles.modalText}>Altura: (M)</Text>
                        <TextInput style={styles.modalInput} keyboardType='numeric'/>
                    </View>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnText}>Confirmar Datos</Text>
                    </Pressable>
                </Modal>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({

    modal:{
        width:'100%',
        height:'100%',
        alignContent:'center',
        textAlign:'center',
    },
    container:{
        flex:1,
        padding:20,
        height:'100%',
    },
    modalContent:{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        padding:70,
    },
    title:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold',
        marginTop:50,
        color:'#1E5F8E',
        
    },
    modalText:{
        fontSize:16,
        fontWeight:'bold',

    },
    modalInput:{
        borderWidth:1,
        borderRadius:10,
        width:70,
        padding:10,
        margin:15,
        textAlign:'center',
    },
    btn:{
        borderWidth:1,
        width:150,
        alignSelf:'center',
        alignItems:'center',
        height:40,
        borderRadius:10,
        backgroundColor:'#4FD1C5',
        borderColor:'#1E5F8E'


    },
    btnText:{
        padding:8,
        fontSize:16,
        color:'#FFFF'
    }
    

});