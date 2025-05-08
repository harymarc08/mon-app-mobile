import { api } from './api';

export const getEnseignants = () => api.get('/enseignants');
export const addEnseignant = (data: any) => api.post('/enseignants', data);
export const updateEnseignant = (matricule: string, data: any) =>
  api.put(`/enseignants/${matricule}`, data);
export const deleteEnseignant = (matricule: string) =>
  api.delete(`/enseignants/${matricule}`);
