export interface EnvModel {
  host?: string;
  gitHashCommit?: string;
  env?: string;
  production: boolean;
  version?: string;
  uriOpenAI?: string;
  apiKeyOpenAI?: string;
  modelOpenAI?: string;
}
