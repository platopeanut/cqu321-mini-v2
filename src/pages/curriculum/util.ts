import type {Course} from "@/models/CourseModel";
import {calcDateAfterNDays} from "@/utils/datetime";

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
                            gridColumnStart: i,
                            gridColumnEnd: i + 1,
                            gridRowStart: j + 1,
                            gridRowEnd: j + 2
                        }
                    } as CourseCell;
                }
                else {
                    if (courseCell.course.code === courses[0].code) {
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