import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator,Button } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function StatsChartScreen() {
  const [stats, setStats] = useState<{ min: number; max: number; total: number } | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://192.168.7.13:3000/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des données...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histogramme des salaires</Text>
      <BarChart
        data={{
          labels: ['Minimum', 'Maximum', 'Total'],
          datasets: [
            {
              data: [stats.min, stats.max, stats.total],
            },
          ],
        }}
        width={Dimensions.get('window').width - 30}
        height={300}
        yAxisLabel=""
        yAxisSuffix=" Ar"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#fff',
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          borderRadius: 16,
          marginTop: 20,
        }}
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
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
