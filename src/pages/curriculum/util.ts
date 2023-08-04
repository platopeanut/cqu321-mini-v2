import type {Course} from "@/models/CourseModel";
import {calcDateAfterNDays} from "@/utils/datetime";

export type GridItemPosStyle = {
    gridColumnStart: number
    gridColumnEnd: number
    gridRowStart: number
    gridRowEnd: number
}

export function getGridItemPosStyle(course: Course) {
    return {
        gridColumnStart: course.dayTime.weekday + 1,
        gridColumnEnd: course.dayTime.weekday + 2,
        gridRowStart: course.dayTime.period.start,
        gridRowEnd: course.dayTime.period.end + 1,
    } as GridItemPosStyle;
}

const COLORS = [
    '#ff9b6a',
    '#addc81',
    '#87ceca',
    '#fecb62',
    '#f06c79',
    '#e286ab',
    '#67bdde',
    '#79cea5',
    '#f0b7e2',
    '#ddd38c',
    '#fc9d99',
    '#facdae',
    '#c7c8a8',
    '#c9ba83',
    '#de9c52',
    '#f9a782',
    '#84af9b',
    '#d2a495',
    '#8abeb2',
    '#6bc235',
    '#269d81',
    '#fecb62',
];

export function makeColorMap(courses: Course[]) {
    const courseNumsSet = new Set<string>();
    courses.forEach(it => courseNumsSet.add(it.courseNum));
    const courseNums = Array.from(courseNumsSet);
    const colorMap = new Map<string, string>();
    for (let i = 0; i < courseNums.length; i++) {
        colorMap.set(courseNums[i], COLORS[i % COLORS.length]);
    }
    return colorMap;
}

// 根据date获取所在周的日期
export function getWeekDates(date: Date) {
    let dayOfWeek = date.getDay();   // 周几
    if (dayOfWeek === 0) dayOfWeek = 7;
    const dateList: number[] = [];
    for (let i = dayOfWeek - 1; i >= 0; --i) {
        dateList.push(calcDateAfterNDays(date, -i).getDate());
    }
    for (let i = 0; i < 7 - dayOfWeek; ++i) {
        dateList.push(calcDateAfterNDays(date, i).getDate());
    }
    return dateList;
}
