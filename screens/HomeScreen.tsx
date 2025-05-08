import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getEnseignants, deleteEnseignant } from '../services/enseignantService';
import { RootStackParamList } from '../navigation/AppNavigator';
import EnseignantCard from '../components/EnseignantCard';
import StatsCard from '../components/StatsCard';

type Enseignant = {
  matricule: string;
  nom: string;
  tauxHoraire: number;
  nbHeures: number;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [stats, setStats] = useState<{ total: number; min: number; max: number } | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const fetchData = async () => {
    try {
      const res = await getEnseignants();
      setEnseignants(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://192.168.7.6:3000/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des stats', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
      fetchStats();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title="Ajouter un enseignant" onPress={() => navigation.navigate('Add')} />
      
      {/* Liste des enseignants */}
      <FlatList
        data={enseignants}
        keyExtractor={(item) => item.matricule}
        renderItem={({ item }) => (
          <EnseignantCard
            enseignant={item}
            onEdit={() => navigation.navigate('Edit', { enseignant: item })}
            onDelete={() => deleteEnseignant(item.matricule).then(fetchData)}
          />
        )}
        ListFooterComponent={
          loadingStats ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            stats && <StatsCard total={stats.total} min={stats.min} max={stats.max} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
