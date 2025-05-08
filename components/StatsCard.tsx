import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatsCardProps = {
  total: number;
  min: number;
  max: number;
};

export default function StatsCard({ total, min, max }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Statistiques</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Total :</Text>
        <Text style={styles.value}>{total}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Min :</Text>
        <Text style={styles.value}>{min}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Max :</Text>
        <Text style={styles.value}>{max}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  value: {
    color: '#000',
  },
});
