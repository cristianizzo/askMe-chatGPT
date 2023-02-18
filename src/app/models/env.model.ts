export interface EnvModel {
  host?: string;
  gitHashCommit?: string;
  env?: string;
  sentry?: string;
  isExtension: boolean;
  production: boolean;
  version?: string;
  uriOpenAI?: string;
  apiKeyOpenAI?: string;
  modelOpenAI?: string;
}
