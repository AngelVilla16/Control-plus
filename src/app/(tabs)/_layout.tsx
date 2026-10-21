import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function BottomTabs(){
    return(
        <Tabs
            screenOptions={{headerShown:false, tabBarStyle:{backgroundColor:'rgb(255, 255, 255)',
                position:'absolute',
                borderTopWidth:0,
                elevation:0,
                height:60,
                paddingBottom:8
            },
            tabBarActiveTintColor:'#0e3755',
            tabBarInactiveTintColor:'#1E5F8E'
        }}
        >
        <Tabs.Screen name='home' options={{title:"Principal", tabBarIcon:({color,size})=>(
            <Ionicons name='home-outline' size={size} color={color}/>
        ),}} />
        <Tabs.Screen name='historial' options={{title:"Historial", tabBarIcon:({color, size})=>(
            <Ionicons name='document-text-outline' size={size} color={color}/>
        ),}}/>
        </Tabs>
    );
}