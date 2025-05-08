import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Stats() {
  const [stats, setStats] = useState<{ total: number; min: number; max: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.7.6:3000/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>📊 Statistiques des prestations</Text>
      <Text>Total: {stats?.total}</Text>
      <Text>Minimum: {stats?.min}</Text>
      <Text>Maximum: {stats?.max}</Text>
    </View>
  );
}
