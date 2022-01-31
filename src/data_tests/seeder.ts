import { createAnalysis } from '../utils/analyzer';
import { connectToDB } from '../models/database';
import { IMarketData } from '../models/analyses';
import { saveAnalysis } from '../controllers/saveAnalysis';
import { getHeadlines } from '../controllers/getHeadlines';
import { createNewArray } from './historicalDataTests';
import { DateTime } from 'luxon';

/**
 * Be careful with this sucker...
 */

export const seed = async () => {
  await connectToDB();
  const todayCET = DateTime.now().setZone('Europe/Paris');
  const market = createNewArray();

  for (let days = 0; days < 53; days++) {
    const previousDay = todayCET.minus({ days: 1 });
    console.log(previousDay.toString());
    const headlines = await getHeadlines(previousDay);
    if (headlines.length > 0) {
      const marketData: IMarketData = {
        timestamp: previousDay.toMillis(),
        data: market[previousDay.toMillis()],
      };
      const headlineAnalysis = createAnalysis(
        headlines,
        marketData,
        previousDay
      );
      await saveAnalysis(headlineAnalysis);
    } else {
      console.log('No headlines found for ' + previousDay.toString());
    }
  }
};

seed();
