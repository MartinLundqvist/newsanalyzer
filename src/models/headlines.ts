import mongoose from 'mongoose';

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
