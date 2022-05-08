export class DateDiff {
  d1: Date;
  t1: number;
  d2: Date;
  t2: number;

  constructor(d1: Date, d2: Date) {
    if (!d1) {
      d1 = new Date();
    }
    if (!d2) {
      d2 = new Date();
    }
    this.d1 = d1;
    this.t1 = d1.getTime();
    this.d2 = d2;
    this.t2 = d2.getTime();
  }

  inMinutes(): number {
    return Math.floor((this.t2 - this.t1) / (60 * 1000));
  }
  inHours(): number {
    return Math.floor((this.t2 - this.t1) / (3600 * 1000));
  }
  inDays() {
    return Math.floor((this.t2 - this.t1) / (24 * 3600 * 1000));
  }
  inWeeks() {
    return parseInt(((this.t2 - this.t1) / (24 * 3600 * 1000 * 7)).toString());
  }
  inMonths() {
    let d1Y = this.d1.getFullYear();
    let d2Y = this.d2.getFullYear();
    let d1M = this.d1.getMonth();
    let d2M = this.d2.getMonth();
    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  }
  inYears() {
    return this.d2.getFullYear() - this.d1.getFullYear();
  }
}

export function getDateDiffString(d1: Date, d2: Date) {
  const diff = new DateDiff(d1, d2);
  const hours = diff.inHours();
  const days = diff.inDays();
  const weeks = diff.inWeeks();
  const months = diff.inMonths();
  const years = diff.inYears();

  let result: string;
  if (years) {
    result = `${years > 0 ? "in" : ""} ${Math.abs(years)} ${
      Math.abs(years) === 1 ? "year" : "years"
    } ${years > 0 ? "" : "ago"}`;
  } else if (months) {
    result = `${months > 0 ? "in" : ""} ${Math.abs(months)} ${
      Math.abs(months) === 1 ? "month" : "months"
    }${months > 0 ? "" : "ago"}`;
  } else if (weeks) {
    result = `${weeks > 0 ? "in" : ""} ${Math.abs(weeks)} ${
      Math.abs(weeks) === 1 ? "week" : "weeks"
    } ${weeks > 0 ? "" : "ago"}`;
  } else if (days) {
    result = `${days > 0 ? "in" : ""} ${Math.abs(days)} ${
      Math.abs(days) === 1 ? "day" : "days"
    } ${days > 0 ? "" : "ago"}`;
  } else if (hours) {
    result = `${hours > 0 ? "in" : ""} ${Math.abs(hours)} ${
      Math.abs(hours) === 1 ? "hour" : "hours"
    } ${days > 0 ? "" : "ago"}`;
  }
  return result ? result : "-";
}
