import axios from 'axios';
import dotenv from 'dotenv';
import { ISentiment, ISentimentFunction } from '../utils/sentiment';

export interface ISentimentResponse {
  sentiment: {
    score: number;
    sentence: string;
  }[];
}

dotenv.config();

const URL = process.env.SENTIMENT_URL || '';

export const getSentiments: ISentimentFunction = async (
  sentences: string[]
): Promise<ISentiment[]> => {
  console.log('Fetching sentiment data for ' + sentences.length + ' headlines');

  try {
    const response = await axios.get<ISentimentResponse>(URL, {
      headers: { 'Content-Type': 'application/json' },
      data: { sentences },
    });

    return response.data.sentiment;
  } catch (err) {
    console.log('Failed to fetch sentiment data: ');
    console.log(err);
  }

  return [];
};
