import {configParser} from './utils';

const getConfigObject = (sourceConfig: string) => ({
  host: configParser(sourceConfig, 'string', 'NG_APP_HOST', window.location.origin),
  gitHashCommit: configParser(sourceConfig, 'string', 'NG_APP_COMMIT', null),
  env: configParser(sourceConfig, 'string', 'NG_APP_ENV', 'local'),
  isExtension: configParser(sourceConfig, 'bool', 'NG_APP_IS_EXTENSION', false),
  production: configParser(sourceConfig, 'bool', 'NG_APP_PROD_BUILD', false),
  version: configParser(sourceConfig, 'string', 'NG_APP_VERSION', '1.0.0'),
  sentry: configParser(sourceConfig, 'string', 'NG_APP_SENTRY_DSN', null),
  openai: {
    uri: configParser(sourceConfig, 'string', 'NG_APP_OPENAI_URI', 'https://api.openai.com'),
    chatModel: configParser(sourceConfig, 'string', 'NG_APP_OPENAI_CHAT_MODEL', 'gpt-3.5-turbo'),
    textModel: configParser(sourceConfig, 'string', 'NG_APP_OPENAI_TEXT_MODEL', 'text-davinci-003'),
  }
});

export default {getConfigObject};
