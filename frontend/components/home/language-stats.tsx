import { View, Text } from 'react-native';

import { globalStyles } from '@/styles/global';
import LanguageChart from '@/components/cards/language-chart';
import { LanguageStatsProps } from '@/interface/language';

export default function LanguageStats({ languageData }: LanguageStatsProps) {
    return (
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
                <Text style={globalStyles.numberPrefix}>03. </Text>
                Linguagens Mais Utilizadas
            </Text>
            <LanguageChart data={languageData} />
        </View>
    );
}