export * from './StringUtils';
export * from './types';
export * from './errors';

import { StringUtils } from './StringUtils';
export const stringUtils = StringUtils.getInstance();