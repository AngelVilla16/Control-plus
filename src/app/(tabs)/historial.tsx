import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Historial(){
    const [filtroActual, setFiltroActual] = React.useState('todos');

    return(
        <ScrollView>
            <SafeAreaProvider style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Historial de sus ultimas mediciones</Text>
                </View>
                <View style={styles.filtersContainer}>
                    <TouchableOpacity style={[styles.filterButton, filtroActual === 'todos' && styles.filterButtonActive]} onPress={() => setFiltroActual('todos')}>
                        <Text style={[styles.filterText, filtroActual === 'todos' && styles.filterTextActive]}>Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterButton, filtroActual === 'glucosa' && styles.filterButtonActive]} onPress={() => setFiltroActual('glucosa')}>
                        <Text style={[styles.filterText, filtroActual === 'glucosa' && styles.filterTextActive]}>Glucosa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterButton, filtroActual === 'presion' && styles.filterButtonActive]} onPress={() => setFiltroActual('presion')}>
                        <Text style={[styles.filterText, filtroActual === 'presion' && styles.filterTextActive]}>Presión</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Últimas mediciones</Text>
                </View>
                <View>

                </View>
            </SafeAreaProvider>
        </ScrollView>
    );    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        justifyContent:'center',
        gap:32,
    },
    header:{
        marginTop:28,
        textAlign:'left',
    
    },
    title:{
        color:'#1E5F8E',
        fontSize:22,
        fontWeight:'bold',
    },
    filtersContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    filterButton:{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
    },
    filterButtonActive:{
        backgroundColor: '#1E5F8E',
    },
    filterText:{
        color: '#64748B',
        fontSize: 14,
        fontWeight: '500',
    },
    filterTextActive:{
        color: '#FFFFFF',
    }
    
});