import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NonSensitivePatientEntry, PatienEntry, NewPatientEntry } from '../types';

const patients: PatienEntry[] = patientsData;

const getEntries = (): PatienEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (entry: NewPatientEntry): PatienEntry => {
  const newPatientEntry = { ...entry, id: uuid() };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, addPatient };