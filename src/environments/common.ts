import {configParser} from './utils';

const getConfigObject = (sourceConfig: string) => ({
  host: configParser(sourceConfig, 'string', 'NG_APP_HOST', window.location.origin),
  gitHashCommit: configParser(sourceConfig, 'string', 'NG_APP_COMMIT', null),
  env: configParser(sourceConfig, 'string', 'NG_APP_ENV', 'local'),
  production: configParser(sourceConfig, 'bool', 'NG_APP_PROD_BUILD', false),
  version: configParser(sourceConfig, 'string', 'NG_APP_VERSION', '1.0.0'),
  uriOpenAI: configParser(sourceConfig, 'string', 'NG_APP_API_KEY_OPENAI', 'https://api.openai.com/v1/completions'),
  apiKeyOpenAI: configParser(sourceConfig, 'string', 'NG_APP_API_KEY_OPENAI', null),
  modelOpenAI: configParser(sourceConfig, 'string', 'NG_APP_MODEL_OPENAI', 'text-davinci-003'),
});

export default {getConfigObject};
