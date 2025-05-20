import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { api } from '../services/api'; // ← assure-toi que le chemin est correct

export default function Stats() {
  const [stats, setStats] = useState<{ total: number; min: number; max: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
