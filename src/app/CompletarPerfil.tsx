import { useState } from 'react';
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

    const [edadIn, setEdad] = useState<string>('');
    const [pesoIn, setPeso] = useState<string>('');
    const [alturaIn, setAltura] = useState<string>('');

    const handleCompletar = async ()=>{
        try{
            const edad = Number(edadIn);
            const peso = Number(pesoIn);
            const altura = Number(alturaIn);
        }
        catch(error:any){
            console.error('Error al completar el perfil del usuario: ', error);
        }
    };

    return(
        <SafeAreaProvider style={styles.container}>
            <Modal transparent={true} visible={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Completa tu perfil</Text>
                        <Text style={styles.subtitle}>Necesitamos algunos datos adicionales para personalizar tu seguimiento de salud.</Text>
                        <View style={styles.modalContent}>
                            <View style={styles.modalData}>
                                <Text style={styles.modalText}>Edad:</Text>
                                <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={setEdad}  />
                            </View>
                            
                            <View style={styles.modalData}>
                                <Text style={styles.modalText}>Peso:  </Text>
                                <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={setPeso}/>
                                <Text style={styles.modalText}>KG</Text>
                            </View>
                            
                            <View style={styles.modalData}>
                                <Text style={styles.modalText}>Altura:</Text>
                                <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={setAltura} />
                                <Text style={styles.modalText}>M</Text>
                            </View>
                        </View>
                        <Pressable style={styles.btn}>
                            <Text style={styles.btnText}>Confirmar Datos</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    modalContent:{
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
    },
    modalData:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 12,
    },
    title:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        marginBottom: 8,
        color:'#1E5F8E',
    },
    subtitle:{
        fontSize:16,
        textAlign:'center',
        marginBottom: 24,
        color: '#444',
    },
    modalText:{
        fontSize:16,
        fontWeight:'bold',
        color: '#333',
    },
    modalInput:{
        borderWidth:1,
        borderRadius:10,
        flex: 1,
        padding:12,
        marginHorizontal: 12,
        textAlign:'center',
        borderColor: '#ddd',
    },
    btn:{
        width: '100%',
        alignItems:'center',
        height:48,
        borderRadius:10,
        backgroundColor:'#4FD1C5',
        justifyContent: 'center',
        marginTop: 16,
    },
    btnText:{
        fontSize:16,
        fontWeight: '600',
        color:'#FFFF'
    }
    

});