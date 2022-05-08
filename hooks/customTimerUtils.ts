import { EstimateType } from "types/TaskTypes";

export function getTimeFromStr(str: string): EstimateType {
  const numbers = str.match(/\d+/g);
  const lettters = str.match(/[a-zA-Z]+/g);
  const res = { h: 0, m: 0, s: 0 };
  try {
    lettters.forEach((_, i) => {
      const isHour = /^h$|^hr$|^hrs$|^hour$|^hours$/.test(lettters[i]);
      const isMinute = /^m$|^min$|^minute$|^minutes$/.test(lettters[i]);
      const isSecond = /^s$|^sec$|^secs$|^second$|^seconds$/.test(lettters[i]);
      const numValue = numbers[i];
      // if (typeof numValue === "number") {
      if (isHour) {
        res.h += Number(numValue);
      } else if (isMinute) {
        res.m += Number(numValue);
      } else if (isSecond) {
        res.s += Number(numValue);
      }
      // }
    });
    return res;
  } catch {
    return {
      h: 0,
      m: 25,
      s: 0,
    };
  }
}

export function getTimeFromEstimateObj({ h, s, m }: EstimateType): Date {
  const time = new Date();
  time.setSeconds(time.getSeconds() + s + m * 60 + h * 60 * 60);
  return time;
}
