import { Diagnosis, Entry as EntryType, HealthCheckRating } from "../../types";
import { Box, Typography, List, ListItem } from '@mui/material';
import { LocalHospital as LocalHospitalIcon, Work as WorkIcon, MedicalServices as MedicalServicesIcon, Favorite as FavoriteIcon } from "@mui/icons-material";

interface EntryProps {
  entry: EntryType;
  diagnoses: Diagnosis[];
}
const Entry = ({ entry, diagnoses }: EntryProps) => {
  const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon style={{ color: 'green' }} />;
      case 1:
        return <FavoriteIcon style={{ color: 'yellow' }} />;
      case 2:
        return <FavoriteIcon style={{ color: 'orange' }} />;
      case 3:
        return <FavoriteIcon style={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Box border={1} borderRadius={4} p={1} borderColor="grey.500">
          <Typography variant="body1">
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography variant="body1">
            {entry.description}
          </Typography>
          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </ListItem>
              ))}
            </List>
          )}
          {entry.discharge && (
            <Typography variant="body1">
              discharge date: {entry.discharge.date} criteria: {entry.discharge.criteria}
            </Typography>
          )}
          <Typography variant="body1">
            diagnosed by {entry.specialist}
          </Typography>
        </Box>
      );
      case "OccupationalHealthcare":
        return (
          <Box border={1} borderRadius={4} p={1} borderColor="grey.500">
            <Typography variant="body1">
              {entry.date} <WorkIcon /> {entry.employerName}
            </Typography>
            <Typography variant="body1">
              {entry.description}
            </Typography>
            {entry.diagnosisCodes && (
              <List>
                {entry.diagnosisCodes.map((code) => (
                  <ListItem key={code}>
                    {code} {diagnoses.find((d) => d.code === code)?.name}
                  </ListItem>
                ))}
              </List>
            )}
            {entry.sickLeave && (
              <Typography variant="body1">
                sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Typography>
            )}
            <Typography variant="body1">
              diagnosed by {entry.specialist}
            </Typography>
          </Box>
        );
    case "HealthCheck":
      return (
        <Box border={1} borderRadius={4} p={1} borderColor="grey.500">
          <Typography variant="body1">
            {entry.date} <MedicalServicesIcon />
          </Typography>
          <Typography variant="body1">
            {entry.description}
          </Typography>
          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </ListItem>
              ))}
            </List>
          )}
          <HealthCheckRatingIcon rating={entry.healthCheckRating} />
          <Typography variant="body1">
            diagnosed by {entry.specialist}
          </Typography>
        </Box>
      );
  }
};
export default Entry;