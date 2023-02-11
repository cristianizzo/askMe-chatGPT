import {InjectionToken} from '@angular/core';
import {EnvModel} from '@app/models';

export const EnvService = new InjectionToken<EnvModel>('EnvModel');
