import axios from 'axios';
import dotenv from 'dotenv';

export interface IHistoricalMarketDataEntry {
  symbol: string;
  timestamp: number[];
  previousClose: any;
  chartPreviousClose: number;
  dataGranularity: number;
  close: number[];
  end: any;
  start: any;
}

export interface IHistoricalMarketData {
  [key: string]: IHistoricalMarketDataEntry;
}

dotenv.config();

const API_KEY = process.env.YAHOO_API_KEY || '';
const URL = process.env.YAHOO_3MONTHS_HISTORICAL_DATA_URL || '';

/**
 * These are the symbols of the markets that must be fetched:
 * ^FCHI,^STOXX50E,^DJI,EURUSD=X,GC=F,BTC-EUR,^CMC200,CL=F,^GDAXI,^FTSE,^IXIC,^GSPC,^N225,^HSI,GBPUSD=X
 * This is the full URL to use: 'https://yfapi.net/v8/finance/spark?interval=1d&range=3mo&symbols=%5EFCHI%2C%5ESTOXX50E%2C%5EDJI%2CEURUSD%3DX%2CGC%3DF%2CBTC-EUR%2C%5ECMC200%2CCL%3DF%2C%5EGDAXI%2C%5EFTSE%2C%5EIXIC%2C%5EGSPC%2C%5EN225%2C%5EHSI%2CGBPUSD%3DX'
 */

export const fetchHistoricalMarketData =
  async (): Promise<IHistoricalMarketData | null> => {
    console.log('Fetching 3 months of historical market data');

    try {
      const response = await axios.get<IHistoricalMarketData>(URL, {
        headers: { Accept: 'application/json', 'X-API-KEY': API_KEY },
      });

      return response.data;
    } catch (err) {
      console.log('Failed to fetch historical market data: ');
      console.log(err);
    }

    return null;
  };
