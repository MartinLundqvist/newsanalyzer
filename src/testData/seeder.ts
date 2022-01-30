import { createAnalysis } from '../analyzer';
import { connectToDB } from '../database';
import { IMarketData, saveAnalysis } from '../models/analyses';
import { getHeadlines } from '../models/headlines';
import { createNewArray } from './historicalDataTests';

/**
 * DO NOT USE THIS FUNCTION ANYMORE - IT CONTAINS DANGEROUS LEGACY CODE AND WILL MESS UP THE DB!
 */

export const seed = async () => {
  await connectToDB();
  const today = new Date();
  const market = createNewArray();

  for (let days = 0; days < 53; days++) {
    const previousDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - days
    );
    console.log(previousDay.toString());
    const headlines = await getHeadlines(previousDay);
    if (headlines.length > 0) {
      const marketData: IMarketData = {
        timestamp: previousDay.getTime(),
        data: market[previousDay.getTime()],
      };
      const headlineAnalysis = createAnalysis(
        headlines,
        marketData,
        previousDay
      );
      await saveAnalysis(headlineAnalysis);
    } else {
      console.log('No headlines found for ' + previousDay.toString());
    }
  }
};

seed();
