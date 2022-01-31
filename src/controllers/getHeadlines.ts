import { DateTime } from 'luxon';
import { IHeadlines, NewsPaperHeadlinesModel } from '../models/headlines';

export const getHeadlines = async (date: DateTime): Promise<IHeadlines[]> => {
  // Create the daterange
  const startDate = date.startOf('day');
  const endDate = date.endOf('day');

  console.log(
    'Fetching headlines from: ' +
      startDate.toString() +
      ' to ' +
      endDate.toString()
  );

  let data: IHeadlines[] = [];

  try {
    data = await NewsPaperHeadlinesModel.find({
      date: { $gte: startDate, $lte: endDate },
    }).exec();
    console.log('Found ' + data.length + ' entries.');
  } catch (err) {
    console.log('Failed to fetch headlines from the model ');
    console.log(err);
  }

  return data;
};
