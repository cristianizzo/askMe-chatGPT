import {configParser} from './utils';

const getConfigObject = (sourceConfig: string) => ({
  host: configParser(sourceConfig, 'string', 'NG_APP_HOST', window.location.origin),
  gitHashCommit: configParser(sourceConfig, 'string', 'NG_APP_COMMIT', null),
  env: configParser(sourceConfig, 'string', 'NG_APP_ENV', 'local'),
  isExtension: configParser(sourceConfig, 'bool', 'NG_APP_IS_EXTENSION', false),
  production: configParser(sourceConfig, 'bool', 'NG_APP_PROD_BUILD', false),
  version: configParser(sourceConfig, 'string', 'NG_APP_VERSION', '1.0.0'),
  sentry: configParser(sourceConfig, 'string', 'NG_APP_SENTRY_DSN', null),
  uriOpenAI: configParser(sourceConfig, 'string', 'NG_APP_URI_OPENAI', 'https://api.openai.com/v1/completions'),
  apiKeyOpenAI: configParser(sourceConfig, 'string', 'NG_APP_API_KEY_OPENAI', null),
  modelOpenAI: configParser(sourceConfig, 'string', 'NG_APP_MODEL_OPENAI', 'text-davinci-003'),
});

export default {getConfigObject};
