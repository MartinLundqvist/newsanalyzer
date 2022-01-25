import { connectToDB } from './model';
import { CronJob } from 'cron';

const start = async () => {
  await connectToDB();

  // TODO: Double check this cron-job
  const job = new CronJob('0 0 0 * * *', async () => {
    // TODO: Implement the actual job...
    //  Load the last 24 hours worth of headlines from the database
    //  Create the output model (see readme.md)
    //  Store it to the database
  });

  job.start();
};

// Main function (uncomment to go live)
start();
