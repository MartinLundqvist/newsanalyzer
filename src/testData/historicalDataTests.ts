import { connectToDB } from '../database';
import { AnalysisModel } from '../models/analyses';
import { historicalMarketData } from './historicalMarketNumbers';
import { testData as marketSummaryResponse } from './marketSummaryResponse';

type TMarketHistory = typeof historicalMarketData;

export interface INewArray {
  [timestamp: number]: {
    market: string;
    symbol: string;
    price: number;
  }[];
}

export const createNewArray = (): INewArray => {
  let results: INewArray = [];
  const marketData = marketSummaryResponse.marketSummaryResponse.result;

  const arrayLike = Object.entries(historicalMarketData);
  for (const [key, value] of arrayLike) {
    console.log(`${key}: has ${value.timestamp.length} entries`);
    // console.log(value.timestamp);

    value.timestamp.forEach((day, index) => {
      const midnight = convertToMidnightSameDayInMilliseconds(day * 1000);

      // console.log('Parsing' + new Date(midnight).toString());

      const market =
        marketData.find((mr) => mr.symbol === value.symbol)?.fullExchangeName ||
        '';

      //   console.log(market);
      //   const market = 'test';

      if (results[midnight]) {
        if (
          results[midnight].findIndex((mr) => mr.symbol === value.symbol) > -1
        ) {
          console.log(
            'Duplicate entires for ' +
              value.symbol +
              ' found at time of ' +
              new Date(midnight).toString()
          );
        }
        results[midnight].push({
          market: market,
          symbol: value.symbol,
          price: value.close[index],
        });
      } else {
        results[midnight] = [
          {
            market: market,
            symbol: value.symbol,
            price: value.close[index],
          },
        ];
      }
    });
  }

  //   console.log(results);
  return results;
};

const convertToMidnightSameDayInMilliseconds = (
  dateInMilliseconds: number
): number => {
  const anytime = new Date(dateInMilliseconds);
  const midnight = new Date(
    anytime.getFullYear(),
    anytime.getMonth(),
    anytime.getDate(),
    0,
    0
  );

  return midnight.getTime();
};

const updateAnalyses = async (input: INewArray) => {
  await connectToDB();

  for await (const [key, value] of Object.entries(input)) {
    const timestamp = parseInt(key, 10);

    const document = await AnalysisModel.find({ date: new Date(timestamp) });

    console.log(
      `${new Date(timestamp).toISOString()}: Found ${
        document.length
      } documents `
    );
  }
};

const dateTests = () => {
  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const yesterday2 = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    0,
    0
  );

  const dateUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    0,
    0
  );

  const yesterday3 = new Date(dateUTC);

  console.log(yesterday.toString());
  console.log(yesterday2.toString());
  console.log(yesterday3.toString());
};

// updateAnalyses(createNewArray());

// listAllDates();

dateTests();
