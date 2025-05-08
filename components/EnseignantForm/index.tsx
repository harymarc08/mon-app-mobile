import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import FormGroup from './FormGroup';
import FormSummary from './FormSummary';
import SubmitButton from './SubmitButton';
import styles from './styles/styles';


export default function EnseignantForms() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tauxHoraire, setTauxHoraire] = useState('');
  const [nbHeures, setNbHeures] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!tauxHoraire || isNaN(parseFloat(tauxHoraire)) || parseFloat(tauxHoraire) < 0) {
      newErrors.tauxHoraire = 'Taux horaire invalide';
    }
    if (!nbHeures || isNaN(parseFloat(nbHeures)) || parseFloat(nbHeures) < 0) {
      newErrors.nbHeures = 'Nombre d\'heures invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const totalSalaire = parseFloat(tauxHoraire) * parseFloat(nbHeures);
    Alert.alert('Succès', `Salaire total: ${totalSalaire.toFixed(2)} Ar`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulaire Enseignant</Text>

      <FormGroup
        label="Nom"
        value={nom}
        onChangeText={setNom}
        error={errors.nom}
        placeholder="Entrez le nom"
      />

      <FormGroup
        label="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        error={errors.prenom}
        placeholder="Entrez le prénom"
      />

      <FormGroup
        label="Taux horaire"
        value={tauxHoraire}
        onChangeText={setTauxHoraire}
        error={errors.tauxHoraire}
        placeholder="Ex: 4000"
        keyboardType="numeric"
      />

      <FormGroup
        label="Nombre d'heures"
        value={nbHeures}
        onChangeText={setNbHeures}
        error={errors.nbHeures}
        placeholder="Ex: 25"
        keyboardType="numeric"
      />

      <FormSummary tauxHoraire={tauxHoraire} nbHeures={nbHeures} />

      <SubmitButton onPress={handleSubmit} label="Valider" disabled={false} />
    </View>
  );
}
