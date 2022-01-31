import { IAnalysis, IMarketData } from '../models/analyses';
import { IHeadlines } from '../models/headlines';
import { DateTime } from 'luxon';

export const createAnalysis = (
  headlines: IHeadlines[],
  marketData: IMarketData,
  date: DateTime
): IAnalysis => {
  // Start by creating the results array
  let results: IAnalysis = {
    date: date,
    count: 0,
    unique: 0,
    headlines: [],
    market_data: marketData,
  };

  // Loop through and create the raw results
  for (const entry of headlines) {
    results.count += 1;
    for (const headline of entry.headlines) {
      const resultHeadline = results.headlines.find(
        (resultHeadline) => resultHeadline.headline === headline.headline
      );

      if (resultHeadline) {
        resultHeadline.count += 1;
      } else {
        results.unique += 1;
        results.headlines.push({
          headline: headline.headline,
          count: 0,
          share_of_total: 0,
        });
      }
    }
  }

  // Loop again to add the share of total

  for (const headline of results.headlines) {
    headline.share_of_total = headline.count / results.count;
  }

  //Then sort the thing according to highest count
  results.headlines.sort((a, b) => b.count - a.count);

  return results;
};
