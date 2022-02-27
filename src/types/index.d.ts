/**
 * Interface for one entry of historical market data from Yahoo Finance API
 */
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

/**
 * Interface for a string-indexed array of market entry data from Yahoo Finance API
 */
export interface IHistoricalMarketData {
  [key: string]: IHistoricalMarketDataEntry;
}

/**
 * Interface for Market Summary response from Yahoo Finance API
 * Generated by https://quicktype.io
 */
export interface IMarketSummaryResponse {
  marketSummaryResponse: MarketSummaryResponse;
}

/**
 * Interface for Market Summary response from Yahoo Finance API
 * Generated by https://quicktype.io
 */
interface MarketSummaryResponse {
  result: Result[];
  error: string | null;
}

/**
 * Interface for Market Summary response from Yahoo Finance API
 * Generated by https://quicktype.io
 */
interface Result {
  fullExchangeName: string;
  exchangeTimezoneName: string;
  symbol: string;
  regularMarketChange: RegularMarket;
  gmtOffSetMilliseconds: number;
  exchangeDataDelayedBy: number;
  firstTradeDateMilliseconds: number;
  language: string;
  regularMarketTime: RegularMarket;
  regularMarketChangePercent: RegularMarket;
  exchangeTimezoneShortName: string;
  quoteType: string;
  marketState: string;
  regularMarketPrice: RegularMarket;
  market: string;
  quoteSourceName?: string;
  priceHint?: number;
  tradeable: boolean;
  sourceInterval: number;
  exchange: string;
  region: string;
  triggerable: boolean;
  regularMarketPreviousClose: RegularMarket;
  shortName?: string;
  currency?: string;
  headSymbolAsString?: string;
  headSymbol?: boolean;
  contractSymbol?: boolean;
  longName?: string;
}

/**
 * Interface for Market Summary response from Yahoo Finance API
 * Generated by https://quicktype.io
 */
interface RegularMarket {
  raw: number;
  fmt: string;
}

/**
 * Interface for the sentiment response API
 */
export interface ISentimentResponse {
  sentiment: {
    score: number;
    sentence: string;
  }[];
}

/**
 * Type enumerating the supported newspapers
 */
export type TNewsPaper =
  | 'SVD'
  | 'Aftonbladet'
  | 'Sydsvenskan'
  | 'GP'
  | 'DN'
  | 'Expressen'
  | 'WSJ'
  | 'Guardian'
  // Below this line are new ones
  | 'WashingtonPost'
  | 'BBC'
  | 'CNN'
  | 'DailyMail'
  | 'NYTimes'
  | 'Yahoo';

export type TLanguage = 'en' | 'se';

/**
 * Interface for a headline Analysis entry
 */
export interface IHeadlineEntry {
  headline: string;
  url: string;
  language: TLanguage;
  newspaper: TNewsPaper;
  count: number;
  share_of_total: number;
  sentiment: number;
}

/**
 * Interface for the Analysis market data points
 */
export interface IMarketDataPoint {
  market: string;
  symbol: string;
  price: number;
}

export interface IMarketData {
  timestamp: number;
  data: IMarketDataPoint[];
}

export interface IAnalysis {
  date: DateTime;
  count: number;
  unique: number;
  headlines: IHeadlineEntry[];
  market_data: IMarketData;
  average_sentiment: number;
}

/**
 * Interface for one newspaper entry of headlines
 */
export interface IHeadlines {
  newspaper: TNewsPaper;
  date: Date;
  headlines: {
    headline: string;
    url: string;
  }[];
}

// Generated by https://quicktype.io

export interface IMarketQuoteResponse {
  quoteResponse: {
    result: IMarketQuote[];
    error: boolean;
  };
}

export interface IMarketQuote {
  language: string;
  region: string;
  quoteType: string;
  triggerable: boolean;
  customPriceAlertConfidence: string;
  contractSymbol: boolean;
  headSymbolAsString: string;
  currency: string;
  marketState: string;
  underlyingSymbol: string;
  underlyingExchangeSymbol: string;
  exchange: string;
  shortName: string;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  gmtOffSetMilliseconds: number;
  openInterest: number;
  expireDate: number;
  expireIsoDate: string;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  sourceInterval: number;
  exchangeDataDelayedBy: number;
  tradeable: boolean;
  market: string;
  esgPopulated: boolean;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  fullExchangeName: string;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  firstTradeDateMilliseconds: number;
  priceHint: number;
  symbol: string;
}
