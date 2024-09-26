import { HUNDRED_PERCENT, 
         LOW_PERCENT, 
         MEDIUM_PERCENT, 
         MILLISECONDS_IN_SECOND } from './constants';
import { ProgressColorClass } from './types';

//formatseconds(60) ==> '+00:01:00'
//formatseconds(-10) ==> '-00:00:10'
//formatseconds(-3600) ==> '-01:00:00'
export function formatSecondsWithSign(seconds) {
  return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`;
}


//formatseconds(60) ==> '00:01:00'
//formatseconds(10) ==> '00:00:10'
//formatseconds(3600) ==> '01:00:00'
export function formatSeconds(seconds) {
  const date = new Date();

  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

//normalizeSelectValue('123')==>123
//normalizeSelectValue('abc')==>'abc'
//normalizeSelectValue(null)==>null
//normalizeSelectValue('')==>0
export function normalizeSelectValue(value) {
  return value === null || isNaN(Number(value)) ? value : +value;
}

export function getProgressColorClass(percentage) {
  if (percentage < LOW_PERCENT) return ProgressColorClass.RED;
  if (percentage < MEDIUM_PERCENT) return ProgressColorClass.YELLOW;
  if (percentage < HUNDRED_PERCENT) return ProgressColorClass.BLUE;

  return ProgressColorClass.GREEN;
}

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
