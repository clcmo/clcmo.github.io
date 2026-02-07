import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

import { globalStyles } from '@/styles/global';

export default function CTA() {
    return (
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
                <Text style={globalStyles.numberPrefix}>04. </Text>
                Vamos conversar?
            </Text>

            <Text style={globalStyles.contactDescription}>
                Estou sempre aberta a novas oportunidades e colaborações. Se você tem um projeto em mente
                ou quer só dizer “olá”, me mande uma mensagem.
            </Text>

            <Pressable
                style={globalStyles.submitButton}
                onPress={() => router.replace('/contact')}
            >
                <Text style={globalStyles.submitButtonText}>Ir para Contato</Text>
            </Pressable>
        </View>
    );
}