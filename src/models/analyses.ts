import mongoose from 'mongoose';

export interface IHeadlineEntry {
  headline: string;
  count: number;
  share_of_total: number;
}

export interface IAnalysis {
  date: Date;
  count: number;
  unique: number;
  headlines: IHeadlineEntry[];
}

const HeadlineEntrySchema = new mongoose.Schema<IHeadlineEntry>({
  headline: {
    type: String,
    default: 'Empty',
  },
  count: {
    type: Number,
    default: 0,
  },
  share_of_total: {
    type: Number,
    default: 0,
  },
});

const AnalysisSchema = new mongoose.Schema<IAnalysis>({
  date: {
    type: Date,
    default: new Date(),
  },
  count: {
    type: Number,
    default: 0,
  },
  headlines: [HeadlineEntrySchema],
});

const AnalysisModel = mongoose.model('analysis', AnalysisSchema);

export const saveAnalysis = async (analysis: IAnalysis) => {
  try {
    console.log('Saving analysis for ' + analysis.date.toString());

    // First check if an analysis already exists in the databse
    const dbAnalysis = await AnalysisModel.findOne({ date: analysis.date });

    if (dbAnalysis) {
      dbAnalysis.overwrite(analysis);
      await dbAnalysis.save();
      console.log('Updated an existing analysis entry. ');
    } else {
      await AnalysisModel.create(analysis);
      console.log('Saved new analysis entry. ');
    }
  } catch (err) {
    console.log('Error saving analysis for ' + analysis.date.toString());
    console.log(err);
  }
};
