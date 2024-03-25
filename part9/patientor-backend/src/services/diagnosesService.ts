import diagnosesData from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

const getEntries = (): DiagnosisEntry[] => {
  return diagnosesData;
};

const addDiagnoses = () => {
  return null;
};

export default { getEntries, addDiagnoses };