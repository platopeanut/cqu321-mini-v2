import {TIME_TABLE} from "@/pages/curriculum/util";
import type {DayTime} from "@/models/CourseModel";

/**
 * 将weeks数组转为weeks字符串
 * @param {number[]} weeks
 * @return {string}
 */
export function getWeeksText(weeks: number[]) {
    if (weeks.length === 0) return "";
    const weekMatrix: number[][] = [[weeks[0]]];
    for (let i = 1; i < weeks.length; i++) {
        if (weeks[i] === weeks[i - 1] + 1) {
            weekMatrix[weekMatrix.length - 1].push(weeks[i]);
        } else {
            weekMatrix.push([weeks[i]]);
        }
    }
    let text = '';
    for (let i = 0; i < weekMatrix.length; i++) {
        if (weekMatrix[i].length === 1) {
            text += `${weekMatrix[i][0]}`;
        } else {
            text += `${weekMatrix[i][0]}-${weekMatrix[i][weekMatrix[i].length - 1]}`;
        }
        if (i < weekMatrix.length - 1) text += ', ';
    }
    return text;
}

/**
 * 将weeksText转为weeks数组
 * @param {string} weeksText
 * @return {number[]}
 */
export function parseWeeksText(weeksText: string) {
    // 去除所有空格
    weeksText = weeksText.replace(/\s+/g, '');
    const periods = weeksText.split(',');
    const weeks = new Set<number>();
    for (const period of periods) {
        const tmp = period.split('-');
        if (tmp.length !== 1 && tmp.length !== 2) continue;
        const start = parseInt(tmp[0]);
        if (isNaN(start)) continue;
        if (tmp.length === 1) {
            weeks.add(start);
            continue;
        }
        const end = parseInt(tmp[1]);
        if (isNaN(end)) continue;
        for (let i = start; i <= end; i++) {
            weeks.add(i);
        }
    }
    return Array.from(weeks);
}

export function getPeriodText(dayTime: DayTime) {
    const week = '一二三四五六日'.split('')[dayTime.weekday]
    return `周${week} ${dayTime.period.start}-${dayTime.period.end}节`;
}

export function getTimeText(dayTime: DayTime) {
    const time1 = TIME_TABLE[dayTime.period.start - 1];
    const time2 = TIME_TABLE[dayTime.period.end - 1];
    const start = time1.split('~')[0];
    const end = time2.split('~')[1];
    return start + ' ~ ' + end;
}