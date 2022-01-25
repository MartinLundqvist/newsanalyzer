import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// TODO: Add a model for the new headlines frequency thing

const DB_STRING = process.env.DB_STRING || '';

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

export const connectToDB = async () => {
  try {
    console.log('Mongoose ready state is: ' + mongoose.connection.readyState);
    await mongoose.connect(DB_STRING);
    console.log('Mongoose ready state is: ' + mongoose.connection.readyState);
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }
};

const NewsPaperHeadlinesModel = mongoose.model(
  'headline',
  NewsPaperHeadlinesSchema
);

// export const saveHeadlines = async ({
//   newspaper,
//   date,
//   headlines,
// }: IHeadlines) => {
//   try {
//     console.log('In the save headlines ting');
//     console.log(headlines);

//     await NewsPaperHeadlinesModel.create({
//       date: date,
//       newspaper: newspaper,
//       headlines: headlines,
//     });

//     console.log('Saved headlines for: ' + newspaper);
//   } catch (err) {
//     console.log(err);
//   }
// };
