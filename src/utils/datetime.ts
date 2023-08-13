import {formatNumber} from "./util";

export const formatTime = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    )
}

export function stringToDateInChinaTime(dateString: string): Date {
    // UTC时间矫正为北京时间
    return new Date(dateString + " GMT+0800");
}

export function calcDaysBetweenDates(date1: Date, date2: Date): number {
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInTime = date2.getTime() - date1.getTime();
    return Math.round(differenceInTime / oneDay);
}

export function calcWeeksBetweenDates(date1: Date, date2: Date): number {
    const days = calcDaysBetweenDates(date1, date2);
    if (days >= 0 ) return Math.trunc(days / 7 + 1);
    else {
        if (days % 7 === 0) return Math.trunc(days / 7) + 1
        else return Math.trunc(days / 7);
    }
}

export function calcDateAfterNDays(date: Date, n: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + n);
    return newDate;
}

export function calcDayOfWeek(date: Date) {
    let day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
}

export function truncDate(date: Date) {
    const newDate = new Date(date.getTime());
    newDate.setHours(0, 0, 0, 0)
    return newDate;
}

export function getCurrTime() {
    const date = new Date();
    return `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;
}

export function getCurrDate() {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${formatNumber(month)}-${formatNumber(day)}`;
}