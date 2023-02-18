export enum ENUM_FROM {
  ME = 'ME',
  BOT = 'BOT',
}

export interface ConversationModel {
  from: ENUM_FROM;
  message: string;
  timestamp: any;
}
