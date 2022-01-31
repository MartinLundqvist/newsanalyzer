import { IAnalysis, AnalysisModel } from '../models/analyses';

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
