export interface EnvModel {
  host?: string;
  gitHashCommit?: string;
  env?: string;
  isExtension: boolean;
  production: boolean;
  version?: string;
  uriOpenAI?: string;
  apiKeyOpenAI?: string;
  modelOpenAI?: string;
}
