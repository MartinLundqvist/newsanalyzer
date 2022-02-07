import natural from 'natural';

export const getSentimentEN = (text: string): number => {
  // Create an array of words
  const Tokenizer = new natural.WordTokenizer();
  const tokenized = Tokenizer.tokenize(text);

  // Pass to the stemmer (to remove morphological and inflexional endings)
  var analyzer = new natural.SentimentAnalyzer(
    'English',
    natural.PorterStemmer,
    'afinn'
  );

  return analyzer.getSentiment(tokenized);
};
