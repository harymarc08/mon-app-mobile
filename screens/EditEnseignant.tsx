import React from 'react';
import { View } from 'react-native';
import EnseignantForm from '../components/EnseignantForm';
import { updateEnseignant } from '../services/enseignantService';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditEnseignant() {
  const navigation = useNavigation();
  const route = useRoute();
  const { enseignant }: any = route.params;

  const handleSubmit = async (values: any) => {
    await updateEnseignant(enseignant.matricule, values);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <EnseignantForm
        initialValues={{
          matricule: enseignant.matricule,
          nom: enseignant.nom,
          tauxHoraire: enseignant.tauxHoraire.toString(),
          nbHeures: enseignant.nbHeures.toString(),
        }}
        disableMatricule
        onSubmit={handleSubmit}
        submitButtonLabel="Modifier"
      />
    </View>
  );
}
