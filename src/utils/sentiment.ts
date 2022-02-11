import natural from 'natural';

export interface ISentimentFunction {
  (sentences: string[]): Promise<ISentiment[]>;
}

export interface ISentiment {
  sentence: string;
  score: number;
}

export const getSentimentEN: ISentimentFunction = async (
  sentences: string[]
): Promise<ISentiment[]> => {
  // Create an array of words
  const Tokenizer = new natural.WordTokenizer();

  // Add a stemmer (to remove morphological and inflexional endings)
  var analyzer = new natural.SentimentAnalyzer(
    'English',
    natural.PorterStemmer,
    'afinn'
  );

  const results: ISentiment[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const tokenized = Tokenizer.tokenize(sentences[i]);
    results.push({
      sentence: sentences[i],
      score: analyzer.getSentiment(tokenized),
    });
  }

  return results;
};
