import { environment } from "../../environments/environment";
import { SVGIcon } from "@progress/kendo-svg-icons/dist/svg-icon.interface";
import { iconsSVG } from "src/assets/icons/svg-icons";

export class Utility {
  private static model: Utility;

  public static instance() {
    if (!this.model) {
      this.model = new Utility();
    }
    return this.model;
  }

  public getUrl(namespace: string, name: string): string {
    const folder = environment.imgFoldUrl;
    return `${folder}/${namespace}/${name}`
  }

  getIcon(name: string) {
    return iconsSVG[name] as SVGIcon
  }

  findFieldInArray<T>(items: any[], value: number | boolean | string, field: string): T | null {
    if (
      !Array.isArray(items)
      && value === undefined
      && field === undefined
      || !items
    ) return null;

    const candidate = items.find(item => item[field] === value);
    return candidate || null
  }

  differenceDate(date1: Date | string, date2?: Date | string) {
    if (date2 == undefined) { date2 = new Date() }
    const d1: Date = new Date(typeof date1 == 'string' ? date1 : date1.getTime());
    const d2: Date = new Date(typeof date2 == 'string' ? date2 : date2.getTime());
    let M: number = 0;
    const d: Date = new Date(d1.getTime());
    while (true) {
      d.setMonth(d.getMonth() + 1);
      if (d.getTime() < d2.getTime())
        M++;
      else {
        d.setMonth(d.getMonth() - 1);
        break;
      }
    }
    let Y: number = parseInt(String(M / 12));
    M = M - (Y * 12);
    const D: number = parseInt(String(Math.abs(d2.getTime() - d.getTime()) / 86400000));
    return { year: Y, month: M, date: D, toString: function () { return this.year + ' years, ' + this.month + ' months, ' + this.date + ' days'; } };
  }

  getDateWithString(dateString: string, format: string, separator: string = '/'): Date {
    const newDAte = new Date();
    if (!dateString) { return newDAte }
    if (!format) { return newDAte }
    const formatArray = format.split(separator)
    if (formatArray.length < 3) { return newDAte }
    let date: { [key: string]: string } = {};
    formatArray.map((el: string, index) => {
      date[el.toLowerCase()] = dateString.split(separator)[index] as string
    })
    return new Date(`${date['yyyy']}-${date['mm']}-${date['dd']}`);
  }

}



