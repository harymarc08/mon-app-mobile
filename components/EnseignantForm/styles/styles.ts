import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    color: '#222',
    textAlign: 'center',
  },
  button: {
    marginTop: 25,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  inputError: {
    borderColor: '#ff6b6b',
    backgroundColor: '#fff0f0',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  summaryValue: {
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  formGroup: {
    marginBottom: 16,
  },
  formSummary: {
    backgroundColor: '#e9f7ef',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
