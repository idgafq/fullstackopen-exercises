import diagnosesData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getEntries = (): Diagnosis  [] => {
  return diagnosesData;
};

const addDiagnoses = () => {
  return null;
};

export default { getEntries, addDiagnoses };