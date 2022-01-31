import { getHeadlines } from './controllers/getHeadlines';
import { CronJob } from 'cron';
import { DateTime } from 'luxon';
import { createAnalysis } from './utils/analyzer';
import { connectToDB } from './models/database';
import { saveAnalysis } from './controllers/saveAnalysis';
import { getMarketData } from './controllers/fetchMarketData';

const start = async () => {
  // This should run every day at 05:00:00am CET.
  const job = new CronJob(
    '0 0 5 * * *',
    async () => {
      await connectToDB();
      const todayCET = DateTime.now().setZone('Europe/Paris');
      const yesterdayStartCET = todayCET.minus({ days: 1 }).startOf('day');
      const headlines = await getHeadlines(yesterdayStartCET);
      const marketData = await getMarketData(yesterdayStartCET);
      const headlineAnalysis = createAnalysis(
        headlines,
        marketData,
        yesterdayStartCET
      );
      await saveAnalysis(headlineAnalysis);
    },
    null,
    false,
    'Europe/Paris'
  );

  job.start();
};

// const testAll = async () => {
//   await connectToDB();
//   const todayCET = DateTime.now().setZone('Europe/Paris');
//   const yesterdayStartCET = todayCET.minus({ days: 1 }).startOf('day');
//   const headlines = await getHeadlines(yesterdayStartCET);

//   const marketData = await getMarketData(yesterdayStartCET);
//   const headlineAnalysis = createAnalysis(
//     headlines,
//     marketData,
//     yesterdayStartCET
//   );
//   await saveAnalysis(headlineAnalysis);
// };

// Main function (uncomment to go live)
start();

// Testfunctions...
// testAll();
