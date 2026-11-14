import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Perfil(){
    const nombre = 'Angel';
    const correo = 'Correo@ejemplo.com';
    const edad=20;
    const peso=70;
    const altura=1.65;
    return(
        <SafeAreaProvider style={styles.container}>
            <View style={styles.containerHead}>
                <Text style={styles.title}>{nombre}</Text>
                <Text style={styles.subtitle}>{correo}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Mis datos</Text>
                <Text>Edad actual:</Text>
                <Text>{edad}</Text>
                <Text>Peso actual:</Text>
                <Text>{peso} </Text>
                <Text>Altura actual:</Text>
                <Text>{altura}</Text>
            </View>
            <View>
                <Text>Actualizar datos</Text>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerHead:{
        marginTop:28,
        textAlign:'center',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        marginBottom:16,
        padding:5
    },
    title:{
        color:'#1E5F8E',
        fontSize:24,
        fontWeight:'500',
        textAlign:'left',
        marginLeft:8,
        marginTop:5
    },
    subtitle:{
        color:'#9c9d9e',
        fontSize:16,
        fontWeight:'500',
        marginLeft:8
    },
    content:{
        padding:3,
        alignItems:'center',
        margin:8,
        gap:16
    }
});