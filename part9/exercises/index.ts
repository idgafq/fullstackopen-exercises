import express from 'express';
import bodyParser from 'body-parser';
import { bmiCalculator } from './bmiCalculator';
import { exercisesCalculator } from './exercisesCalculator';

const app = express();
app.use(bodyParser.json());

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  
  return res.send({ weight, height, bmi: bmiCalculator(Number(height), Number(weight))});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isNaN(target)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const hours of daily_exercises) {
    if (isNaN(hours)) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.send(exercisesCalculator(target, daily_exercises));
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});