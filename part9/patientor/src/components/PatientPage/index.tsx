import { useParams } from "react-router-dom";
import { useState } from "react";
import patientService from '../../services/patients';
import { Diagnosis, NewEntry, Patient } from "../../types";

import { Button } from "@mui/material";
import { Female as FemaleIcon, Male as MaleIcon, Transgender as TransgenderIcon } from '@mui/icons-material';
import Entry from "./Entry";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams();
  
  const fetchPatient = async () => {
    try {
      if (id) {
        const patient = await patientService.getPatient(id);
        setPatient(patient);

      } else {
        setPatient(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchPatient();

  const submitEntry = async (values: NewEntry) => {
    try {
      if (id) {
        const patient = await patientService.addEntry(values, id);
        setPatient(patient);
        setModalOpen(false);
        setError(undefined);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === 'female' && <FemaleIcon />}
        {patient.gender === 'male' && <MaleIcon />}
        {patient.gender === 'other' && <TransgenderIcon />}
      </h2>
      <p>
        ssn: {patient.ssn}<br />
        occupation: {patient.occupation}
      </p>

      <h3>entries</h3>
      {patient.entries.map((e) => (
        <div key={e.id}>
          < Entry entry={e} diagnoses={diagnoses} />
          <br />
        </div>
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        onClose={closeModal}
        error={error}
        codes={diagnoses.map((d) => d.code)}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;