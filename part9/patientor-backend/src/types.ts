export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatienEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatienEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatienEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Other = 'other',
  Female = 'female',
}