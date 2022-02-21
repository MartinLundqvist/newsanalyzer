import { DateTime } from 'luxon';
import { getMarketData } from '../controllers/fetchMarketData';
import { getSentiments } from '../controllers/fetchSentiments';
import { getHeadlines } from '../controllers/getHeadlines';
import { connectToDB } from '../models/database';
import { createAnalysis } from '../utils/analyzer';
import { getLanguage } from '../utils/getLanguage';
import { getSentimentEN } from '../utils/sentiment';

const test_getLanguage = () => {
  console.log(getLanguage('Aftonbladet'));
  console.log(getLanguage('WashingtonPost'));
  console.log(getLanguage('SVD'));
  console.log(getLanguage('Yahoo'));
};

const test_getSentiment = async () => {
  console.log(
    await getSentiments([
      'So happy and peppy and charming',
      'So depressed and low and sad',
    ])
  );
};

const test_createAnalysis = async (dayOffset: number) => {
  await connectToDB();
  const todayCET = DateTime.now().setZone('Europe/Paris');
  const yesterdayStartCET = todayCET.minus({ days: dayOffset }).startOf('day');
  const headlines = await getHeadlines(yesterdayStartCET);

  const marketData = await getMarketData(yesterdayStartCET);
  const headlineAnalysis = await createAnalysis(
    headlines,
    marketData,
    yesterdayStartCET,
    getSentiments
  );
  console.log(JSON.stringify(headlineAnalysis.average_sentiment, null, 2));
};

// test_createAnalysis(11);

// test_getSentiment();

test_getLanguage();
