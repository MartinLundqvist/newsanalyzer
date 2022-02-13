import { DateTime } from 'luxon';
import { getMarketData } from '../controllers/fetchMarketData';
import { getSentiments } from '../controllers/fetchSentiments';
import { getHeadlines } from '../controllers/getHeadlines';
import { saveAnalysis } from '../controllers/saveAnalysis';
import { connectToDB } from '../models/database';
import { createAnalysis } from '../utils/analyzer';

const updateYesterday = async () => {
  await connectToDB();
  const todayCET = DateTime.now().setZone('Europe/Paris');
  const yesterdayStartCET = todayCET.minus({ days: 1 }).startOf('day');
  const headlines = await getHeadlines(yesterdayStartCET);
  const marketData = await getMarketData(yesterdayStartCET);
  const headlineAnalysis = await createAnalysis(
    headlines,
    marketData,
    yesterdayStartCET,
    getSentiments
  );
  await saveAnalysis(headlineAnalysis);
  return;
};

updateYesterday();
