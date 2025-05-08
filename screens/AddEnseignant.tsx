import React from 'react';
import { View } from 'react-native';
import EnseignantForm from '../components/EnseignantForm';
import { addEnseignant } from '../services/enseignantService';
import { useNavigation } from '@react-navigation/native';

export default function AddEnseignant() {
  const navigation = useNavigation();

  const handleSubmit = async (values: any) => {
    await addEnseignant(values);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <EnseignantForm onSubmit={handleSubmit} submitButtonLabel="Ajouter" />
    </View>
  );
}
