import commonConfig from './common';
import {EnvModel} from '@app/models';

declare const process: any;

const config: EnvModel = commonConfig.getConfigObject(process.env);

if (config.env === 'local') {
  console.log(config);
}

export const environment = config;
