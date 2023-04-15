export interface EnvModel {
  host?: string;
  gitHashCommit?: string;
  env?: string;
  sentry?: string;
  isExtension: boolean;
  production: boolean;
  version?: string;
  openai: {
    uri: string;
    chatModel: string;
    textModel: string;
  }
}
