import dotenv from 'dotenv';
import axios from 'axios';
import { DateTime } from 'luxon';
import { IMarketData, IMarketDataPoint, IMarketQuoteResponse } from '../types';

/**
 * These are the symbols of the markets that are fetched:
 * ^FCHI,^STOXX50E,^DJI,EURUSD=X,GC=F,BTC-EUR,^CMC200,CL=F,^GDAXI,^FTSE,^IXIC,^GSPC,^N225,^HSI,GBPUSD=X
 */

dotenv.config();

const API_KEY = process.env.YAHOO_API_KEY || '';
const URL = process.env.YAHOO_URL || '';

export const getMarketData = async (date: DateTime): Promise<IMarketData> => {
  console.log('Fetching market data for' + date.toString());

  try {
    // const response = testData; // Debug
    const response = await axios.get<IMarketQuoteResponse>(URL, {
      headers: { Accept: 'application/json', 'X-API-KEY': API_KEY },
    });
    const parsed = parseRawMarketData(response.data, date);

    return parsed;
  } catch (err) {
    console.log('Failed to fetch market data: ');
    console.log(err);
  }

  return {
    timestamp: date.toMillis(),
    data: [],
  };
};

const parseRawMarketData = (
  data: IMarketQuoteResponse,
  date: DateTime
): IMarketData => {
  const results = {
    timestamp: date.toMillis(),
    data: [] as IMarketDataPoint[],
  };

  // TODO: Some debugging code here
  console.log(
    `Parsing market data for ${data.quoteResponse.result.length} markets.`
  );

  data.quoteResponse.result.forEach((market) => {
    //TODO:  Some debugging code
    // console.log(
    //   `Found data for symbol: ${market.symbol} with price ${market.regularMarketPrice.raw}.`
    // );

    results.data.push({
      market: market.fullExchangeName,
      price: market.regularMarketPrice,
      symbol: market.symbol,
    });
  });

  return results;
};
