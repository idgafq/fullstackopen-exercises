import { TextField, InputLabel, MenuItem, Select, Grid, Button }from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { Diagnosis, EntryFormat, HealthCheckRating, NewEntry } from '../../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  codes: Array<Diagnosis['code']>;
  format: EntryFormat;
}

const AddEntryForm = ({ onSubmit, onCancel, codes, format }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setdiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (format) {
      case EntryFormat.Hospital:
        onSubmit({
          date,
          specialist,
          diagnosisCodes,
          description,
          discharge: {
            date: dischargeDate,
            criteria
          },
          type: "Hospital"
        });
        break;
      case EntryFormat.Occupational:
        onSubmit({
          date,
          specialist,
          diagnosisCodes,
          description,
          employerName,
          sickLeave: {
            startDate,
            endDate
          },
          type: "OccupationalHealthcare"
        });
        break;
      case EntryFormat.Health:
        onSubmit({
          date,
          specialist,
          diagnosisCodes,
          description,
          healthCheckRating,
          type: "HealthCheck"
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          fullWidth
          name="date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          name="specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {format === EntryFormat.Hospital && <InputLabel>Discharge date</InputLabel>}
        {format === EntryFormat.Hospital && <TextField
          type="date"
          fullWidth
          name="discharge date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />}
        {format === EntryFormat.Hospital && <TextField
          label="Criteria"
          fullWidth
          name="criteria"
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />}


        {format === EntryFormat.Occupational && <TextField
          label="Employer name"
          fullWidth
          name="employer name"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />}
        {format === EntryFormat.Occupational && <InputLabel>Sick leave start</InputLabel>}
        {format === EntryFormat.Occupational && <TextField
          type="date"
          fullWidth
          name="sick leave start date"
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />}
        {format === EntryFormat.Occupational && <InputLabel>end</InputLabel>}
        {format === EntryFormat.Occupational && <TextField
          type="date"
          fullWidth
          name="sick leave end date"
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
        />}

        {format === EntryFormat.Health && <InputLabel>Healthcheck rating</InputLabel>}
        {format === EntryFormat.Health && <Select
          label="Healthcheck rating"
          fullWidth
          name="healthcheck rating"
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value as HealthCheckRating)}
        >
          {Object.values(HealthCheckRating).filter((v) => typeof v === 'number').map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </Select>
        }
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
        <Select
          label="Diagnoses codes"
          fullWidth
          name="diagnoses codes"
          value={diagnosisCodes}
          multiple={true}
          onChange={({ target }) => setdiagnosisCodes(Array.isArray(target.value) ? target.value : [target.value])}
        >
          {codes.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;