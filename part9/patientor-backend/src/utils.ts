import { NewPatient, Gender, NewEntry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('name not a string');
  }

  return name;
};

const isDate = (date: unknown): date is string => {
  return isString(date) && Boolean(Date.parse(date));
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!isDate(dateOfBirth)) {
      throw new Error('Incorrect date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('ssn not a string');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map((g) => g.toString()).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Malformatted gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('occupation not a string');
  }

  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object &&
    'ssn' in object && 'gender' in object && 'occupation' in object) {
      const newEntry: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
      };

      return newEntry;
    }

    throw new Error('Incorrect data: a field missing');

};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('specialist not a string');
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('description not a string');
  }

  return description;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isDischarge = (object: unknown): object is HospitalEntry['discharge'] => {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    return false;
  }
  if (!isDate(object.date) || !isString(object.criteria)) {
    return false;
  }
  return true;
};

const parseDischarge = (object: unknown): HospitalEntry['discharge'] =>  {
  if (!object || typeof object !== 'object' || !('discharge' in object) || !isDischarge(object.discharge)) {
    throw new Error('Malformatted discharge')
  }

  return object.discharge;
};

const parseEmployerName = (object: unknown): string => {
  if (!object || typeof object !== 'object' || !('employerName' in object) || !isString(object.employerName)) {
    throw new Error('Incorrect employer name');
  }

  return object.employerName;
};

const isSickLeave = (object: unknown): object is OccupationalHealthcareEntry['sickLeave'] => {
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
    return false;
  }
  if (!isDate(object.startDate) || !isDate(object.endDate)) {
    return false;
  }
  return true;
};

const parseSickLeave = (object: unknown): OccupationalHealthcareEntry['sickLeave'] =>  {
  if (!object || typeof object !== 'object' || !('sickLeave' in object) || !isSickLeave(object.sickLeave)) {
    throw new Error('Malformatted sick leave')
  }

  return object.sickLeave;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number';
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (!object || typeof object !== 'object' || !('healthCheckRating' in object) ||
    !isNumber(object.healthCheckRating) || !isHealthCheckRating(object.healthCheckRating)) {
    throw new Error('Inccorect health check rating');
  }

  return object.healthCheckRating;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && 'date' in object && 'specialist' in object && 'description' in object &&
    'diagnosisCodes' in object) {
      switch (object.type) {
        case 'Hospital':
          return ({
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            description: parseDescription(object.description),
            type: 'Hospital',
            discharge: parseDischarge(object)
          });
        case 'OccupationalHealthcare':
          return ({
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            description: parseDescription(object.description),
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object),
            sickLeave: parseSickLeave(object)
          });
        case 'HealthCheck':
          return ({
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            description: parseDescription(object.description),
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object)
          });
      }
  }
  throw new Error('Missing fields or incorrect entry type');
};