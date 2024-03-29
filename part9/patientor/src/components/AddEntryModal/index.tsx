import { Dialog, DialogTitle, DialogContent, Divider, Alert, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { useState } from 'react';
import { Diagnosis, EntryFormat, NewEntry } from '../../types';
import AddEntryForm from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
  codes: Array<Diagnosis['code']>;
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose, error, codes }: Props) => {
  const [format, setFormat] = useState<EntryFormat>(EntryFormat.Hospital);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormat(event.target.value as EntryFormat);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <FormLabel component="legend">Entry type:</FormLabel>
        <RadioGroup row value={format} onChange={handleRadioChange}>
            <FormControlLabel value={EntryFormat.Hospital} control={<Radio />} label="Hospital" />
            <FormControlLabel value={EntryFormat.Occupational} control={<Radio />} label="Occupational Healthcare" />
            <FormControlLabel value={EntryFormat.Health} control={<Radio />} label="Healthcheck" />
        </RadioGroup>
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} codes={codes} format={format} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;