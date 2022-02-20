import { createAnalysis } from './analyzer';
import { connectToDB } from '../models/database';
import { IMarketData } from '../models/analyses';
import { saveAnalysis } from '../controllers/saveAnalysis';
import { getHeadlines } from '../controllers/getHeadlines';
import { createMarketDataArray } from './createMarketDataArray';
import { DateTime } from 'luxon';
import { getSentiments } from '../controllers/fetchSentiments';

/**
 * Be careful with this sucker...
 */

export const seed = async (numDays: number) => {
  await connectToDB();
  const todayCET = DateTime.now().setZone('Europe/Paris').startOf('day');
  const market = await createMarketDataArray();

  if (market === null) {
    console.log('No market data found. Aborting');
    return;
  }

  for (let days = 0; days < numDays; days++) {
    const previousDay = todayCET.minus({ days: days });
    console.log(previousDay.toString());
    const headlines = await getHeadlines(previousDay);
    if (headlines.length > 0) {
      const marketData: IMarketData = {
        timestamp: previousDay.toMillis(),
        data: market[previousDay.toMillis()],
      };
      const headlineAnalysis = await createAnalysis(
        headlines,
        marketData,
        previousDay,
        getSentiments
      );
      await saveAnalysis(headlineAnalysis);
    } else {
      console.log('No headlines found for ' + previousDay.toString());
    }
  }
};

seed(7);
