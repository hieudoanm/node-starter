import dotenv, { DotenvParseOutput } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export default {
  config(): DotenvParseOutput {
    const output = dotenv.config();
    dotenvExpand.expand(output);
    return output.parsed || {};
  },
};
