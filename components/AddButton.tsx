import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Ajouter un enseignant" onPress={onPress} color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 15,
  },
});
