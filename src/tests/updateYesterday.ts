import { DateTime } from 'luxon';
import { getMarketData } from '../controllers/fetchMarketData';
import { getSentiments } from '../controllers/fetchSentiments';
import { getHeadlines } from '../controllers/getHeadlines';
import { saveAnalysis } from '../controllers/saveAnalysis';
import { connectToDB } from '../models/database';
import { createAnalysis } from '../utils/analyzer';

const updateYesterday = async () => {
  const start = new Date();
  console.log('<-Start-------------------------------------------->');

  await connectToDB();
  const todayCET = DateTime.now().setZone('Europe/Paris');
  const yesterdayStartCET = todayCET.minus({ days: 1 }).startOf('day');
  const [headlines, marketData] = await Promise.all([
    getHeadlines(yesterdayStartCET),
    getMarketData(yesterdayStartCET),
  ]);
  // const headlines = await getHeadlines(yesterdayStartCET);
  // const marketData = await getMarketData(yesterdayStartCET);
  const headlineAnalysis = await createAnalysis(
    headlines,
    marketData,
    yesterdayStartCET,
    getSentiments
  );
  await saveAnalysis(headlineAnalysis);
  console.log(
    'Job completed in ' +
      (new Date().getMilliseconds() - start.getMilliseconds()) +
      ' milliseconds'
  );
  console.log('<-End---------------------------------------------->');
  return;
};

updateYesterday();
