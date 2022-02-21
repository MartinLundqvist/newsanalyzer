import { TLanguage, TNewsPaper } from '../types';

type TLanguageMap = {
  [Newspaper in TNewsPaper]: TLanguage;
};

const languageMap: TLanguageMap = {
  SVD: 'se',
  Aftonbladet: 'se',
  Sydsvenskan: 'se',
  GP: 'se',
  DN: 'se',
  Expressen: 'se',
  WSJ: 'en',
  Guardian: 'en',
  // Below this line are new ones
  WashingtonPost: 'en',
  BBC: 'en',
  CNN: 'en',
  DailyMail: 'en',
  NYTimes: 'en',
  Yahoo: 'en',
};

export const getLanguage = (newspaper: TNewsPaper): TLanguage => {
  return languageMap[newspaper];
};
