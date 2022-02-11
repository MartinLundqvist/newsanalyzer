import { IAnalysis, IMarketData, TLanguage } from '../models/analyses';
import { IHeadlines, TNewsPaper } from '../models/headlines';
import { DateTime } from 'luxon';
import { getSentimentEN, ISentimentFunction } from './sentiment';

export const createAnalysis = async (
  headlines: IHeadlines[],
  marketData: IMarketData,
  date: DateTime,
  sentimentFunction: ISentimentFunction
): Promise<IAnalysis> => {
  // Start by creating the results array
  let results: IAnalysis = {
    date: date,
    count: 0,
    unique: 0,
    headlines: [],
    market_data: marketData,
    average_sentiment: 0,
  };

  // Loop through and create the raw results, minus the sentiment.
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
        let language = getLanguage(entry.newspaper);
        results.headlines.push({
          headline: headline.headline,
          newspaper: entry.newspaper,
          language: language,
          count: 0,
          share_of_total: 0,
          sentiment: 0, // Placeholder
        });
      }
    }
  }

  // Fetch sentiments.

  const sentences = results.headlines
    .filter((headline) => headline.language === 'en')
    .map((headline) => headline.headline);

  const sentiments = await sentimentFunction(sentences);

  // Loop again to add the sentiments, share of total, and the contribution to the overall sentiment
  // We need to keep track of total share of all english headlines because we only extract sentiment on english papers

  let totalEnglishSentiment = 0;
  let shareOfTotalEnglishHeadlines = 0;

  for (const headline of results.headlines) {
    headline.share_of_total = headline.count / results.count;
    if (headline.language === 'en') {
      const sentiment =
        sentiments.find((entry) => entry.sentence === headline.headline)
          ?.score || 0;
      headline.sentiment = sentiment;
      // const sentiment = sentiments.find(
      //   (entry) => entry.sentence === headline.headline
      // ).score;
      totalEnglishSentiment += headline.share_of_total * headline.sentiment;
      shareOfTotalEnglishHeadlines += headline.share_of_total;
      console.log(headline);
    }
  }

  // Now we can calculate and add the average sentiment. If there were no english headlines (for some reason), we need add a fail safe to avoid divide by zero errors
  results.average_sentiment =
    shareOfTotalEnglishHeadlines > 0
      ? totalEnglishSentiment / shareOfTotalEnglishHeadlines
      : 0;

  //Then sort the thing according to highest count
  results.headlines.sort((a, b) => b.count - a.count);

  return results;
};

export const getLanguage = (newspaper: TNewsPaper): TLanguage => {
  switch (newspaper) {
    case 'WSJ':
      return 'en';
    case 'Guardian':
      return 'en';
    default:
      return 'se';
  }
};
