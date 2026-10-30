import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const [nombre, setNombre] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const route = useRouter();

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

    useEffect(() => {
        obtenerUsuario();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await obtenerUsuario();
        setRefreshing(false);
    };

    const navigateToGlucosa = () => {
        // TODO: Implementar navegación a registrar glucosa
        route.push('/RegistrarGlucosa');
    };
    const navigateToPresion = () => {
        // TODO: Implementar navegación a registrar presión
        route.push('/RegistrarPresion');
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E5F8E" />
            </SafeAreaView>
        );
    }

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

                
                <Text style={styles.sectionTitle}>Resumen de hoy</Text>
                <View style={styles.statsRow}>
                    <View style={styles.statCardGlucosa}>
                        <View style={styles.statIconContainer}>
                            <Image source={require('../../assets/drop.png')} style={styles.statIcon} />
                        </View>
                        <Text style={styles.statValue}>-- mg/dL</Text>
                        <Text style={styles.statLabelGlucosa}>Glucosa</Text>
                        <Text style={styles.statTime}>Sin registros hoy</Text>
                    </View>
                    <View style={styles.statCardPresion}>
                        <View style={styles.statIconContainer}>
                            <Image source={require('../../assets/ecg.png')} style={styles.statIcon} />
                        </View>
                        <Text style={styles.statValue}>--/--</Text>
                        <Text style={styles.statLabelPresion}>Presión</Text>
                        <Text style={styles.statTime}>Sin registros hoy</Text>
                    </View>
                </View>

                {/* Mediciones recientes */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Últimas mediciones</Text>
                    <Pressable style={styles.seeAllButton} onPress={() => route.push('/historial')}>
                        <Text style={styles.seeAllText}>Ver todo</Text>
                    </Pressable>
                </View>
                <View style={styles.measurementsList}>
                    <View style={styles.emptyState}>
                        <Image source={require('../../assets/drop.png')} style={styles.emptyIcon} />
                        <Text style={styles.emptyText}>No hay mediciones registradas</Text>
                        <Text style={styles.emptySubtext}>Comienza registrando tu primera medición</Text>
                    </View>
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
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 24,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        tintColor: '#CBD5E1',
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#475569',
        textAlign: 'center',
        marginBottom: 6,
    },
    emptySubtext: {
        fontSize: 13,
        color: '#94A3B8',
        textAlign: 'center',
    },
});