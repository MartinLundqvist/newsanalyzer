import mongoose from 'mongoose';

export type TNewsPaper =
  | 'SVD'
  | 'Aftonbladet'
  | 'Sydsvenskan'
  | 'GP'
  | 'DN'
  | 'Expressen'
  | 'WSJ'
  | 'Guardian';

export interface IHeadlines {
  newspaper: TNewsPaper;
  date: Date;
  headlines: {
    headline: string;
    url: string;
  }[];
}

const HeadlineSchema = new mongoose.Schema({
  headline: {
    type: String,
    default: 'Empty',
  },
  url: {
    type: String,
    default: 'Empty',
  },
});

const NewsPaperHeadlinesSchema = new mongoose.Schema({
  newspaper: {
    type: String,
    default: 'Unknown',
  },
  date: {
    type: Date,
    default: new Date(),
  },
  headlines: [HeadlineSchema],
});

const NewsPaperHeadlinesModel = mongoose.model(
  'headline',
  NewsPaperHeadlinesSchema
);

export const getHeadlines = async (date: Date): Promise<IHeadlines[]> => {
  // Create the daterange
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59
  );

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
