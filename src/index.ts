import { getHeadlines } from './models/headlines';
import { CronJob } from 'cron';
import { createAnalysis } from './analyzer';
import { connectToDB } from './database';
import { saveAnalysis } from './models/analyses';

const start = async () => {
  // This should run every day at 05:00:00am
  const job = new CronJob('0 0 5 * * *', async () => {
    await connectToDB();
    const today = new Date();
    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    const headlines = await getHeadlines(yesterday);
    const headlineAnalysis = createAnalysis(headlines, yesterday);
    await saveAnalysis(headlineAnalysis);
  });

  job.start();
};

// Main function (uncomment to go live)
start();
