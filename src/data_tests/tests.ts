import { DateTime } from 'luxon';
import { getMarketData } from '../controllers/fetchMarketData';
import { getHeadlines } from '../controllers/getHeadlines';
import { connectToDB } from '../models/database';
import { createAnalysis, getLanguage } from '../utils/analyzer';
import { getSentimentEN } from '../utils/sentiment';

const test_getLanguage = () => {
  console.log(getLanguage('Aftonbladet'));
};

const test_getSentimentEN = () => {
  console.log(getSentimentEN('So happy and peppy and charming'));
  console.log(getSentimentEN('So depressed and low and sad'));
};

const test_createAnalysis = async (dayOffset: number) => {
  await connectToDB();
  const todayCET = DateTime.now().setZone('Europe/Paris');
  const yesterdayStartCET = todayCET.minus({ days: dayOffset }).startOf('day');
  const headlines = await getHeadlines(yesterdayStartCET);

  const marketData = await getMarketData(yesterdayStartCET);
  const headlineAnalysis = createAnalysis(
    headlines,
    marketData,
    yesterdayStartCET
  );
  console.log(JSON.stringify(headlineAnalysis, null, 2));
};

test_createAnalysis(11);
