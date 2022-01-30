import { IMarketData, IMarketDataPoint } from './models/analyses';
import dotenv from 'dotenv';
import { testData } from './testData/marketSummaryResponse';
import axios from 'axios';

/**
 * These are the symbols of the markets that are fetched:
 * ^FCHI,^STOXX50E,^DJI,EURUSD=X,GC=F,BTC-EUR,^CMC200,CL=F,^GDAXI,^FTSE,^IXIC,^GSPC,^N225,^HSI,GBPUSD=X
 */

dotenv.config();

type TRawData = typeof testData;

const API_KEY = process.env.YAHOO_API_KEY || '';
const URL = process.env.YAHOO_URL || '';

export const getMarketData = async (date: Date): Promise<IMarketData> => {
  try {
    // const response = testData; // Debug
    const response = await axios.get<TRawData>(URL, {
      headers: { Accept: 'application/json', 'X-API-KEY': API_KEY },
    });
    const parsed = parseRawMarketData(response.data, date);

    return parsed;
  } catch (err) {
    console.log(err);
  }

  return {
    timestamp: date.getTime(),
    data: [],
  };
};

const parseRawMarketData = (data: TRawData, date: Date): IMarketData => {
  const results = {
    timestamp: date.getTime(),
    data: [] as IMarketDataPoint[],
  };

  data.marketSummaryResponse.result.forEach((market) => {
    results.data.push({
      market: market.fullExchangeName,
      price: market.regularMarketPrice.raw,
      symbol: market.symbol,
    });
  });

  return results;
};
