import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function StatsPieChartScreen() {
  const [stats, setStats] = useState<{ min: number; max: number; total: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://192.168.7.13:3000/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Erreur de chargement', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Chargement des statistiques...</Text>
      </View>
    );
  }

  const chartData = [
    {
      name: 'Salaire Min',
      population: stats.min,
      color: '#f39c12',
      legendFontColor: '#7f8c8d',
      legendFontSize: 15,
    },
    {
      name: 'Salaire Max',
      population: stats.max,
      color: '#27ae60',
      legendFontColor: '#7f8c8d',
      legendFontSize: 15,
    },
   
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Répartition des salaires</Text>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 30}
        height={250}
        chartConfig={{
          color: () => '#fff',
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
