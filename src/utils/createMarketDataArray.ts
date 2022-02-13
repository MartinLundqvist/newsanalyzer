import { fetchHistoricalMarketData } from '../controllers/fetchHistoricalMarketData';
import { testData as marketSummaryResponse } from '../tests/marketSummaryResponse';

export interface INewArray {
  [timestamp: number]: {
    market: string;
    symbol: string;
    price: number;
  }[];
}

export const createMarketDataArray = async (): Promise<INewArray | null> => {
  let results: INewArray = [];

  // TODO: Replace with a simple data structure instead. This only used to fetch some metadata.
  const marketData = marketSummaryResponse.marketSummaryResponse.result;

  const historicalMarketData = await fetchHistoricalMarketData();

  if (historicalMarketData === null) {
    return null;
  }

  const arrayLike = Object.entries(historicalMarketData);

  for (const [key, value] of arrayLike) {
    console.log(`${key}: has ${value.timestamp.length} entries`);

    value.timestamp.forEach((day, index) => {
      const midnight = convertToMidnightSameDayInMilliseconds(day * 1000);

      const market =
        marketData.find((mr) => mr.symbol === value.symbol)?.fullExchangeName ||
        '';

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

// const updateAnalyses = async (input: INewArray) => {
//   await connectToDB();

//   for await (const [key, value] of Object.entries(input)) {
//     const timestamp = parseInt(key, 10);

//     const document = await AnalysisModel.find({ date: new Date(timestamp) });

//     console.log(
//       `${new Date(timestamp).toISOString()}: Found ${
//         document.length
//       } documents `
//     );
//   }
// };
