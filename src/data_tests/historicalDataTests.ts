import { connectToDB } from '../models/database';
import { AnalysisModel } from '../models/analyses';
import { historicalMarketData } from './historicalMarketNumbers3';
import { testData as marketSummaryResponse } from './marketSummaryResponse';

export interface INewArray {
  [timestamp: number]: {
    market: string;
    symbol: string;
    price: number;
  }[];
}

export const createNewArray = (): INewArray => {
  let results: INewArray = [];

  // TODO: Replace with a simple data structure instead. This only used to fetch some metadata.
  const marketData = marketSummaryResponse.marketSummaryResponse.result;

  // TODO: Replace this sucker with a proper API call to Yahoo!
  /**
   * These are the symbols of the markets that must be fetched:
   * ^FCHI,^STOXX50E,^DJI,EURUSD=X,GC=F,BTC-EUR,^CMC200,CL=F,^GDAXI,^FTSE,^IXIC,^GSPC,^N225,^HSI,GBPUSD=X
   * This is the full URL to use: 'https://yfapi.net/v8/finance/spark?interval=1d&range=3mo&symbols=%5EFCHI%2C%5ESTOXX50E%2C%5EDJI%2CEURUSD%3DX%2CGC%3DF%2CBTC-EUR%2C%5ECMC200%2CCL%3DF%2C%5EGDAXI%2C%5EFTSE%2C%5EIXIC%2C%5EGSPC%2C%5EN225%2C%5EHSI%2CGBPUSD%3DX'
   */
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
