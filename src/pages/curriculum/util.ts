import type {Course} from "@/models/CourseModel";
import {calcDateAfterNDays, calcDayOfWeek} from "@/utils/datetime";

export type CourseCell = {
    course: Course
    pos: GridItemPosStyle
    bgColor: string
    isOverlap: boolean
}

export type GridItemPosStyle = {
    gridColumnStart: number
    gridColumnEnd: number
    gridRowStart: number
    gridRowEnd: number
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

export const TIME_TABLE = [
    '08:30~09:15',
    '09:25~10:10',
    '10:30~11:15',
    '11:25~12:10',
    '13:30~14:15',
    '14:25~15:10',
    '15:20~16:05',
    '16:25~17:10',
    '17:20~18:05',
    '19:00~19:45',
    '19:55~20:40',
    '20:50~21:35',
    '21:45~22:30',
];

export function makeColorMap(courses: Course[]) {
    const codeSet = new Set<string>();
    // 根据课程编号区分颜色（使同一课程的教学课与实验课颜色相同）
    courses.forEach(it => codeSet.add(it.code));
    const codes = Array.from(codeSet);
    const colorMap = new Map<string, string>();
    for (let i = 0; i < codes.length; i++) {
        colorMap.set(codes[i], COLORS[i % COLORS.length]);
    }
    return colorMap;
}

// 根据date获取所在周的日期
export function getWeekDates(date: Date) {
    let dayOfWeek = calcDayOfWeek(date);
    const dateList: number[] = [];
    for (let i = dayOfWeek - 1; i >= 0; --i) {
        dateList.push(calcDateAfterNDays(date, -i-1).getDate());
    }
    for (let i = 0; i < 7 - dayOfWeek; ++i) {
        dateList.push(calcDateAfterNDays(date, i).getDate());
    }
    return dateList;
}

export function makeCoursesMatrix(courses: Course[]) {
    // 初始化 7 * 13 矩阵，每个元素是一个Course[]
    const matrix = new Array<Course[][]>();
    for (let i = 0; i < 7; i++) {
        const li: Course[][] = [];
        for (let j = 0; j < 13; j++) {
            li.push(new Array<Course>());
        }
        matrix.push(li);
    }
    // 填充
    courses.forEach(it => {
        for (let i = it.dayTime.period.start - 1; i < it.dayTime.period.end; i++) {
            matrix[it.dayTime.weekday][i].push(it);
        }
    });
    return matrix;
}

export function getCourseCells(coursesMatrix: Course[][][]) {
    const courseCells: CourseCell[] = [];
    for (let i = 0; i < 7; i++) {
        const dayCourses = coursesMatrix[i];
        let courseCell: CourseCell | null = null;
        for (let j = 0; j < dayCourses.length; j++) {
            const courses = dayCourses[j];
            if (courses.length > 0) {
                const isOverlap = courses.length > 1;
                if (courseCell === null) {
                    courseCell = {
                        bgColor: "",
                        course: courses[0],
                        isOverlap: isOverlap,
                        pos: {
                            gridColumnStart: i + 1,
                            gridColumnEnd: i + 2,
                            gridRowStart: j + 1,
                            gridRowEnd: j + 2
                        }
                    } as CourseCell;
                }
                else {
                    // 按照教学班号区分（区分同一课程的教学课与实验课）
                    if (courseCell.course.courseNum === courses[0].courseNum) {
                        if (isOverlap) courseCell.isOverlap = isOverlap;
                        courseCell.pos.gridRowEnd ++;
                    }
                    // submit
                    else {
                        courseCells.push(courseCell);
                        courseCell = null;
                        j --;
                    }
                }
                // submit
                if (courseCell !== null && j === dayCourses.length - 1) {
                    courseCells.push(courseCell);
                    courseCell = null;
                }
            }
            // submit
            else if (courseCell !== null) {
                courseCells.push(courseCell);
                courseCell = null;
            }
        }
    }
    return courseCells;
}

export function calcMinutes(hour: number, minute: number) {
    return hour * 60 + minute;
}
export function calcCurrPeriod(date: Date): [number, number] {
    const hour = date.getHours();
    const minute = date.getMinutes();
    let i = 0;
    for (; i < 13; i++) {
        const period = TIME_TABLE[i].split('~').map(it => it.split(':'));
        const [startH, startM] = [parseInt(period[0][0]), parseInt(period[0][1])];
        const [endH, endM] = [parseInt(period[1][0]), parseInt(period[1][1])];
        const curr = calcMinutes(hour, minute);
        const start = calcMinutes(startH, startM);
        const end = calcMinutes(endH, endM);
        if (curr <= end) {
            if (curr <= start) return [i, 0];
            return [i, (curr - start) / (end - start)];
        }
    }
    return [i - 1, 1];
}