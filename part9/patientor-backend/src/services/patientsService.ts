import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatient, NonSensitivePatient, NewEntry } from '../types';
import { parseGender } from '../utils';

const patients: Patient[] = patientsData;

const getAll = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | null => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return { ...patient, gender: parseGender(patient.gender)};
  }
  return null;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = { ...entry, id: uuid(), entries: [] };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error('patient not found');
  }
  patient.entries = patient.entries.concat({ ...entry, id: uuid() });
  patients.filter((p) => p.id !== patient.id ? p : patient);
  return patient;
};

export default { getAll, getNonSensitiveEntries, getPatient, addPatient, addEntry };