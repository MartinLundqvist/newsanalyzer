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

export const NewsPaperHeadlinesModel = mongoose.model(
  'headline',
  NewsPaperHeadlinesSchema
);
