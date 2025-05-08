import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles/styles';


interface Props {
  onPress: () => void;
  label: string;
  disabled: boolean;
}

export default function SubmitButton({ onPress, label, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.submitButton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.submitButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}
