import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface Props {
  initialValues?: {
    matricule: string;
    nom: string;
    tauxHoraire: string;
    nbHeures: string;
  };
  onSubmit: (values: {
    matricule: string;
    nom: string;
    tauxHoraire: number;
    nbHeures: number;
  }) => void;
  submitButtonLabel: string;
  disableMatricule?: boolean;
}

export default function EnseignantForm({
  initialValues,
  onSubmit,
  submitButtonLabel,
  disableMatricule = false,
}: Props) {
  const [matricule, setMatricule] = useState(initialValues?.matricule || '');
  const [nom, setNom] = useState(initialValues?.nom || '');
  const [tauxHoraire, setTauxHoraire] = useState(initialValues?.tauxHoraire || '');
  const [nbHeures, setNbHeures] = useState(initialValues?.nbHeures || '');
  
  // Form validation states
  const [errors, setErrors] = useState({
    matricule: '',
    nom: '',
    tauxHoraire: '',
    nbHeures: ''
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Validate form whenever values change
  useEffect(() => {
    validateForm();
  }, [matricule, nom, tauxHoraire, nbHeures]);
  
  const validateForm = () => {
    const newErrors = {
      matricule: '',
      nom: '',
      tauxHoraire: '',
      nbHeures: ''
    };
    
    let valid = true;
    
    // Validate matricule (non-empty)
    if (!matricule.trim()) {
      newErrors.matricule = 'Le matricule est requis';
      valid = false;
    }
    
    // Validate nom (non-empty)
    if (!nom.trim()) {
      newErrors.nom = 'Le nom est requis';
      valid = false;
    }
    
    // Validate tauxHoraire (numeric and positive)
    if (!tauxHoraire) {
      newErrors.tauxHoraire = 'Le taux horaire est requis';
      valid = false;
    } else if (isNaN(parseFloat(tauxHoraire)) || parseFloat(tauxHoraire) <= 0) {
      newErrors.tauxHoraire = 'Le taux horaire doit être un nombre positif';
      valid = false;
    }
    
    // Validate nbHeures (numeric and positive)
    if (!nbHeures) {
      newErrors.nbHeures = 'Le nombre d\'heures est requis';
      valid = false;
    } else if (isNaN(parseFloat(nbHeures)) || parseFloat(nbHeures) <= 0) {
      newErrors.nbHeures = 'Le nombre d\'heures doit être un nombre positif';
      valid = false;
    }
    
    setErrors(newErrors);
    setIsFormValid(valid);
  };
  
  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({
        matricule,
        nom,
        tauxHoraire: parseFloat(tauxHoraire),
        nbHeures: parseFloat(nbHeures),
      });
    } else {
      Alert.alert(
        "Formulaire invalide",
        "Veuillez corriger les erreurs avant de soumettre le formulaire.",
        [{ text: "OK" }]
      );
    }
  };
  
  // Format currency input
  const formatCurrency = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    return numericValue;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Informations de l'enseignant</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Matricule</Text>
          <TextInput
            editable={!disableMatricule}
            style={[
              styles.input,
              errors.matricule ? styles.inputError : null,
              disableMatricule ? styles.disabledInput : null
            ]}
            value={matricule}
            onChangeText={setMatricule}
            placeholder="Entrez le matricule"
          />
          {errors.matricule ? <Text style={styles.errorText}>{errors.matricule}</Text> : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nom</Text>
          <TextInput 
            style={[styles.input, errors.nom ? styles.inputError : null]}
            value={nom}
            onChangeText={setNom}
            placeholder="Entrez le nom complet"
          />
          {errors.nom ? <Text style={styles.errorText}>{errors.nom}</Text> : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Taux horaire (Ar)</Text>
          <TextInput
            style={[styles.input, errors.tauxHoraire ? styles.inputError : null]}
            value={tauxHoraire}
            onChangeText={(text) => setTauxHoraire(formatCurrency(text))}
            keyboardType="numeric"
            placeholder="0.00"
          />
          {errors.tauxHoraire ? <Text style={styles.errorText}>{errors.tauxHoraire}</Text> : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre d'heures</Text>
          <TextInput
            style={[styles.input, errors.nbHeures ? styles.inputError : null]}
            value={nbHeures}
            onChangeText={setNbHeures}
            keyboardType="numeric"
            placeholder="0"
          />
          {errors.nbHeures ? <Text style={styles.errorText}>{errors.nbHeures}</Text> : null}
        </View>
        
        <View style={styles.formSummary}>
          <Text style={styles.summaryText}>
            Salaire total: <Text style={styles.summaryValue}>
              {!isNaN(parseFloat(tauxHoraire)) && !isNaN(parseFloat(nbHeures)) 
                ? `${(parseFloat(tauxHoraire) * parseFloat(nbHeures)).toFixed(2)} Ar` 
                : '0.00 €'}
            </Text>
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.submitButton, !isFormValid && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.submitButtonText}>{submitButtonLabel}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff6b6b',
    backgroundColor: '#fff0f0',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
  },
  formSummary: {
    backgroundColor: '#e9f7ef',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b2bec3',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});