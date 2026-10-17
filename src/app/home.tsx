import {
    ScrollView,
    StyleSheet
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home(){
    return(
        <ScrollView>
            <SafeAreaProvider>

            </SafeAreaProvider>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

});