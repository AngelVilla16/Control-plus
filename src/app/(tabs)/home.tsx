import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ObtenerGlucosa } from '../../services/glucosa';
import { ObtenerPresion } from '../../services/presion';
export default function Home() {
    const [nombre, setNombre] = useState<string>("");
    const [filtro, setFiltro] = useState<string>("glucosa");
    const [id, setId] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const route = useRouter();
    const [glucosa, setGlucosa] = useState<any>(null);
    const [dataGlucosa, setDataGlucosa] = useState<any>([]);
    const [presion, setPresion] = useState<any>(null);
    const [dataPresion, setDataPresion] = useState<any>([]);
    const [mensaje, setMensaje] = useState<string>('');

    const obtenerUsuario = async () => {
        try {
            const id_guardado = await SecureStore.getItemAsync('id_usuario');
            const nombre_guardado = await SecureStore.getItemAsync('nombre');
            

            if (id_guardado !== null) {
                setId(id_guardado);
                setNombre(nombre_guardado || '');
            }
        } catch (error) {
            console.error("Error al leer los datos del usuario: ", error);
        } finally {
            setLoading(false);
        }
    };

    

    const obtenerGlucosa = async () => {
        try {
            const token: any = await SecureStore.getItemAsync('user_token');
            const data = await ObtenerGlucosa(token);
            const medicionesGlucosa = Array.isArray(data)
                ? data.filter((item) => item?.glucosa != null && !item?.mensaje)
                : [];

            if (medicionesGlucosa.length === 0) {
                setGlucosa('0');
                setDataGlucosa([]);
                return;
            }

            setGlucosa(medicionesGlucosa[0]?.glucosa ?? '0');
            setDataGlucosa(medicionesGlucosa);
        } catch (error) {
            console.error('Error al obtener glucosa en home:', error);
            setGlucosa('0');
            setDataGlucosa([]);
        }
    };

    const obtenerPresion = async () => {
        try {
            const token: any = await SecureStore.getItemAsync('user_token');
            const data = await ObtenerPresion(token);
            const medicionesPresion = Array.isArray(data)
                ? data.filter((item) => item?.sistolica != null && item?.diastolica != null)
                : [];

            if (medicionesPresion.length === 0) {
                setPresion('0');
                setDataPresion([]);
                return;
            }

            const ultima = medicionesPresion[0];
            setPresion(`${ultima.sistolica}/${ultima.diastolica}`);
            setDataPresion(medicionesPresion);
        } catch (error) {
            console.error('Error al obtener presión en home:', error);
            setPresion('0');
            setDataPresion([]);
        }
    };
    useEffect(()=>{
        obtenerUsuario();
        obtenerGlucosa();
        obtenerPresion();
    }, []);
    
    const onRefresh = async () => {
        setRefreshing(true);
        await obtenerUsuario();
        await obtenerGlucosa();
        await obtenerPresion();
        setRefreshing(false);
    };

    const navigateToGlucosa = () => {
        
        route.push('/RegistrarGlucosa');
    };
    const navigateToPresion = () => {
        
        route.push('/RegistrarPresion');
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E5F8E" />
            </SafeAreaView>
        );
    }

    const formatearFecha = (fechaISO: string) => {
        if (!fechaISO) return '';
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const mediciones = filtro === 'glucosa'
        ? (Array.isArray(dataGlucosa)
            ? dataGlucosa.filter((item) => item?.glucosa != null).slice(0, 5)
            : [])
        : (Array.isArray(dataPresion)
            ? dataPresion.filter((item) => item?.sistolica != null && item?.diastolica != null).slice(0, 5)
            : []);

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1E5F8E']} />}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView style={styles.container}>
                
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.greeting}>¡Hola, {nombre || 'Usuario'}! </Text>
                        <Text style={styles.tagline}>Mejores números, mejor salud</Text>
                    </View>
                   
                </View>

                {/* Esta es la seccion de botones*/}

                <Text style={styles.sectionTitle}>Acciones rápidas</Text>
                <View style={styles.actionsRow}>
                    <Pressable style={styles.actionCard} onPress={navigateToGlucosa}>
                        <View style={styles.actionIconContainer}>
                            <Image source={require('../../assets/drop.png')} style={styles.actionIcon} />
                        </View>
                        <Text style={styles.actionLabel}>Registrar Glucosa</Text>
                        
                    </Pressable>
                    <Pressable style={styles.actionCard} onPress={navigateToPresion}>
                        <View style={styles.actionIconContainer}>
                            <Image source={require('../../assets/ecg.png')} style={styles.actionIcon} />
                        </View>
                        <Text style={styles.actionLabel}>Registrar Presión</Text>
                      
                    </Pressable>
                </View>

                {/* Sección de resumen*/}
                <Text style={styles.sectionTitle}>Resumen de hoy</Text>
                <View style={styles.statsRow}>
                    <View style={styles.statCardGlucosa}>
                        <View style={styles.statIconContainer}>
                            <Image source={require('../../assets/drop.png')} style={styles.statIcon} />
                        </View>
                        <Text style={styles.statValue}>{glucosa ?? 0} mg/dL</Text>
                        <Text style={styles.statLabelGlucosa}>Glucosa</Text>
                        
                    </View>
                    <View style={styles.statCardPresion}>
                        <View style={styles.statIconContainer}>
                            <Image source={require('../../assets/ecg.png')} style={styles.statIcon} />
                        </View>
                        <Text style={styles.statValue}>{presion ?? 0}</Text>
                        <Text style={styles.statLabelPresion}>Presión</Text>
                       
                    </View>
                </View>

                {/* Mediciones recientes */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Últimas mediciones</Text>
                    <Pressable style={styles.seeAllButton} onPress={() => route.push('/historial')}>
                        <Text style={styles.seeAllText}>Ver todo</Text>
                    </Pressable>
                </View>
                <View style={styles.filtercontainer}>
                   <TouchableOpacity style={[styles.filterbutton, filtro === 'glucosa' && styles.filterbuttonactive]} onPress={()=>setFiltro('glucosa')}>
                    <Text style={[styles.textfilter, filtro === 'glucosa' && styles.textfilteractive]}>Glucosa</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.filterbutton, filtro==='presion' && styles.filterbuttonactive]} onPress={()=> setFiltro('presion') }>
                    <Text style={[styles.textfilter, filtro === 'presion' && styles.textfilteractive]}>Presión</Text>
                   </TouchableOpacity>
                </View>
                <View style={styles.measurementsList}>
                   <FlatList
                        scrollEnabled={false}
                        data={mediciones}
                        keyExtractor={(item, index) => String(item?.id ?? item?._id ?? index)}
                        ItemSeparatorComponent={() => <View style={styles.measurementSeparator} />}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Image source={filtro === 'glucosa' ? require('../../assets/drop.png') : require('../../assets/ecg.png')} style={styles.emptyIcon} />
                                <Text style={styles.emptyText}>
                                    {filtro === 'glucosa' ? 'No hay mediciones de glucosa' : 'No hay mediciones de presión'}
                                </Text>
                                <Text style={styles.emptySubtext}>
                                    {filtro === 'glucosa' ? 'Registra tu primera medición para verla aquí.' : 'Registra tu presión para comenzar tu seguimiento.'}
                                </Text>
                            </View>
                        }
                        renderItem={({ item }) => {
                            const esGlucosa = filtro === 'glucosa';
                            const valor = esGlucosa
                                ? `${item?.glucosa ?? '--'}`
                                : `${item?.sistolica ?? '--'}/${item?.diastolica ?? '--'}`;
                            const unidad = esGlucosa ? ' mg/dL' : ' mmHg';
                            const momento = item?.momento || item?.seleccionado || 'Sin momento';

                            return (
                                <View style={styles.measurementCard}>
                                    <View style={styles.measurementIconWrap}>
                                        <Image
                                            source={esGlucosa ? require('../../assets/drop.png') : require('../../assets/ecg.png')}
                                            style={styles.measurementIcon}
                                        />
                                    </View>
                                    <View style={styles.measurementInfo}>
                                        <View style={styles.measurementTopRow}>
                                            <Text style={styles.measurementValue}>{valor}</Text>
                                            <Text style={styles.measurementUnit}>{unidad}</Text>
                                        </View>
                                        <Text style={styles.measurementDate}>{formatearFecha(item?.fecha)}</Text>
                                    </View>
                                    <View style={styles.measurementBadge}>
                                        <Text style={styles.measurementBadgeText} numberOfLines={1}>{momento}</Text>
                                    </View>
                                </View>
                            );
                        }}
                   />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 32,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },

    /* Header */
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
    },
    headerLeft: {
        flex: 1,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
        textAlign:'center',
    },
    tagline: {
        fontSize: 15,
        color: '#64748B',
        fontWeight: '400',
        textAlign:'center',
    },
    avatarContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#1E5F8E',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1E5F8E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    avatarText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    /* Section Title */
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        paddingHorizontal: 20,
        marginTop: 8,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 8,
        marginBottom: 12,
    },

    /* Quick Actions */
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        gap: 12,
    },
    actionCard: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        height:58,
        
        
    },
    actionIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 24,
        backgroundColor: '#ECFDF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    actionIcon: {
        width: 24,
        height: 24,
        tintColor: '#1E5F8E',
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E293B',
        textAlign: 'left',
        marginBottom: 0,
    },
  

    /* Stats Cards */
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        gap: 12,
    },
    statCardGlucosa: {
        flex: 1,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#F0F4FF',
    },
    statCardPresion: {
        flex: 1,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#FFF7ED',
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#ECFDF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statIcon: {
        width: 24,
        height: 24,
        tintColor: '#1E5F8E',
    },
    statValue: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    statLabelGlucosa: {
        fontSize: 13,
        fontWeight: '500',
        color: '#1E3A8A',
        marginBottom: 6,
    },
    statLabelPresion: {
        fontSize: 13,
        fontWeight: '500',
        color: '#B45309',
        marginBottom: 6,
    },
    statTime: {
        fontSize: 11,
        color: '#94A3B8',
    },

    /* See All Button */
    seeAllButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E5F8E',
    },

    /* Measurements List */
    measurementsList: {
        paddingHorizontal: 16,
    },
    measurementCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    measurementIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    measurementIcon: {
        width: 22,
        height: 22,
        tintColor: '#1E5F8E',
    },
    measurementInfo: {
        flex: 1,
    },
    measurementTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 4,
    },
    measurementValue: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
    },
    measurementUnit: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 2,
    },
    measurementDate: {
        fontSize: 13,
        color: '#64748B',
        textTransform: 'capitalize',
    },
    measurementBadge: {
        maxWidth: 110,
        backgroundColor: '#ECFDF5',
        borderColor: '#A7F3D0',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        marginLeft: 8,
    },
    measurementBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#047857',
        textTransform: 'capitalize',
    },
    measurementSeparator: {
        height: 10,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
    },
    emptyIcon: {
        width: 48,
        height: 48,
        tintColor: '#94A3B8',
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
        marginBottom: 6,
    },
    emptySubtext: {
        fontSize: 13,
        color: '#94A3B8',
        textAlign: 'center',
    },
    filtercontainer:{
        flexDirection:'row',
        padding:4,
        marginHorizontal:16,
        marginBottom:12,
        gap: 10,
        backgroundColor: '#E2E8F0',
        borderRadius: 14,
    },
    filterbutton:{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    filterbuttonactive:{
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    textfilter:{
        fontSize:15,
        fontWeight:'600',
        color: '#64748B',
    },
    textfilteractive:{
        color: '#0F766E',
    },
});