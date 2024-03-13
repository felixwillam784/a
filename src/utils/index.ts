/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
import moment from "moment-timezone";

export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

export function mix(color1: string, color2: string, weight: number) {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);
  const rStr = ('0' + (r || 0).toString(16)).slice(-2);
  const gStr = ('0' + (g || 0).toString(16)).slice(-2);
  const bStr = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + rStr + gStr + bStr;
}

export function stringtoDate(dateString:string) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}
// 时间戳转日期格式
export function formatDate(value: string | number | undefined, text?: number) {
  let time = value || 0;
  if (String(time).length === 10) {
    time = +time * 1000;
  }
  const date = new Date(time);
  const year = text ? date.getUTCFullYear : date.getFullYear();
  const month = text ? (date.getUTCMonth() + 1).toString().padStart(2, '0') : (date.getMonth() + 1).toString().padStart(2, '0');
  const day = text ? date.getUTCDate().toString().padStart(2, '0') : date.getDate().toString().padStart(2, '0');
  const hours = text ? date.getUTCHours().toString().padStart(2, '0') : date.getHours().toString().padStart(2, '0');
  const minutes = text ? date.getUTCMinutes().toString().padStart(2, '0') : date.getMinutes().toString().padStart(2, '0');
  const seconds = text ? date.getUTCSeconds().toString().padStart(2, '0') : date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function formatTimestampWithTimezone(timestamp: string | number, timezoneOffset = 0): string {
  if (String(timestamp).length === 10) {
      timestamp = +timestamp * 1000;
  }

  // 使用Moment.js来处理日期和时区
  const formattedDate = moment(timestamp).utcOffset(timezoneOffset).format('YYYY-MM-DD HH:mm:ss');
  return formattedDate;
}
