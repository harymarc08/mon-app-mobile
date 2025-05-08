import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Enseignant = {
  matricule: string;
  nom: string;
  tauxHoraire: number;
  nbHeures: number;
};

type EnseignantCardProps = {
  enseignant: Enseignant;
  onEdit: () => void;
  onDelete: () => void;
};

export default function EnseignantCard({ enseignant, onEdit, onDelete }: EnseignantCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{enseignant.nom}</Text>
      <Text style={styles.prestation}>Prestation: {enseignant.tauxHoraire * enseignant.nbHeures} Ar</Text>

      <View style={styles.buttonContainer}>
        <Button title="Modifier" onPress={onEdit} />
        <View style={styles.spacing} />
        <Button title="Supprimer" color="red" onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4, 
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  prestation: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacing: {
    width: 10,
  },
});
