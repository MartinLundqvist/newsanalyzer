# This service conducts a daily analysis of the headline titles collected and stores these in the database

# The scope of those analyses is intended to be:

- Headline frequency
  { date: Date;
  number_of_headlines: number;
  headlines: [
  {
  headline: text;
  occurances: number;
  share_of_all_occurances: number
  }
  ]
  }
