import { connectToDB } from '../models/database';
import { NewsPaperHeadlinesModel } from '../models/headlines';
import { DateTime } from 'luxon';

/**
 * Deletes all headlines entries in the headlines collection which are older than 3 months.
 * Use with care......
 */

export const cleanDB = async () => {
  try {
    await connectToDB();
    // Delete all headlines that are older than 3 months.

    const threeMonthsAgo = DateTime.now().minus({ months: 3 });
    console.log('Deleting all headlines older than ' + threeMonthsAgo.toISO());

    const numberHeadlinesDeleted = await NewsPaperHeadlinesModel.deleteMany({
      date: { $lt: threeMonthsAgo },
    }).exec();

    console.log(
      'Found and deleted ' + numberHeadlinesDeleted.deletedCount + ' entries.'
    );
  } catch (err) {
    console.log('Something went wrong.');
    console.log(err);
  }
};

cleanDB();
