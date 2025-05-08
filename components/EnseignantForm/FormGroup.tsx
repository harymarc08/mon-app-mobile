import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles/styles';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
  editable?: boolean;
}

export default function FormGroup({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType = 'default',
  editable = true
}: Props) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          !editable ? styles.disabledInput : null
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
