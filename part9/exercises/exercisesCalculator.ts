interface InputValues {
  target: number,
  dailyHours: number[]
}
type Rating = 1 | 2 | 3;
interface ExerciaseEval {
  periodLength: number,
  tradingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: number,
  average: number
}
const PASSING_PERCENTAGE: number = 70;

const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers!');
  }
  const target = Number(args[2]);

  const dailyHours = [];
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    dailyHours.push(Number(args[i]));
  }
  
  return { target, dailyHours };
};

export const exercisesCalculator = (target: number, dailyHours: number[]): ExerciaseEval => {
  const periodLength = dailyHours.length;
  const tradingDays = dailyHours.filter((h) => h !== 0).length;
  const average = dailyHours.reduce((a, c) => a + c, 0) / periodLength;
  const success = average >= target;

  let rating : Rating;
  let ratingDescription = '';
  if (average >= target) {
    rating = 3;
    ratingDescription = 'good job';
  } else if (average >= target * PASSING_PERCENTAGE / 100) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'do not go gentle into that good night';
  }

  return { periodLength, tradingDays, success, rating, ratingDescription, target, average };
};

if (require.main === module) {
  try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(exercisesCalculator(target, dailyHours));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}