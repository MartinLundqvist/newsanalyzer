import { createAnalysis } from './analyzer';
import { connectToDB } from './database';
import { saveAnalysis } from './models/analyses';
import { getHeadlines } from './models/headlines';

export const seed = async () => {
  await connectToDB();
  const today = new Date();

  for (let days = 0; days < 53; days++) {
    const previousDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - days
    );
    console.log(previousDay.toString());
    const headlines = await getHeadlines(previousDay);
    if (headlines.length > 0) {
      const headlineAnalysis = createAnalysis(headlines, previousDay);
      await saveAnalysis(headlineAnalysis);
    } else {
      console.log('No headlines found for ' + previousDay.toString());
    }
  }
};

seed();
