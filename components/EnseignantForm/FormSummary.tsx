import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/styles';

interface Props {
  tauxHoraire: string;
  nbHeures: string;
}

export default function FormSummary({ tauxHoraire, nbHeures }: Props) {
  const total =
    !isNaN(parseFloat(tauxHoraire)) && !isNaN(parseFloat(nbHeures))
      ? (parseFloat(tauxHoraire) * parseFloat(nbHeures)).toFixed(2)
      : '0.00';

  return (
    <View style={styles.formSummary}>
      <Text style={styles.summaryText}>
        Salaire total: <Text style={styles.summaryValue}>{total} Ar</Text>
      </Text>
    </View>
  );
}
