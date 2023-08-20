import StdModel from "@/core/StdModel";
import {oldRequestV1} from "@/core/old";
import type {DayTime} from "@/models/CourseModel";
import {getWeeksText, parseWeeksText} from "@/utils/course";
import {stdGetStorage, stdSetStorage} from "@/core/storage";

class CustomCourseCloudService {
    private static async _getCode() {
        const res = await uni.login();
        return res.code;
    }
    public static async push(customCourses: CustomCourse[]) {
        const code = await this._getCode();
        await oldRequestV1({
            url: "/course_table/push_custom_event",
            data: {
                'Code': code,
                'Events': customCourses.map(customCourseToEvent),
            }
        });
    }
    public static async pull() {
        const code = await this._getCode();
        const res = await oldRequestV1({
            url: "/course_table/pull_custom_event",
            data: {
                'Code': code,
            }
        });
        return (res.Events as _Event[]).map(eventToCustomCourse);
    }
}

class CustomCourseModel extends StdModel {
    private static _instance: CustomCourseModel | null = null;
    private constructor() { super(); }
    public static getInstance() {
        if (this._instance === null) this._instance = new CustomCourseModel();
        return this._instance;
    }
    private static STORAGE_KEY = "CustomCourse";
    private _courses: CustomCourse[] = [];
    public clear() { this._courses = []; }
    public async get() {
        if (this._courses.length > 0) return this._courses;
        try {
            this._courses = await stdGetStorage<CustomCourse[]>(CustomCourseModel.STORAGE_KEY);
        } catch (e) {
            this._courses = [];
        }
        return this._courses;
    }
    public async add(customCourse: CustomCourse) {
        this._courses.push(customCourse);
        await stdSetStorage(CustomCourseModel.STORAGE_KEY, this._courses);
    }
    public async del(code: string) {
        this._courses = this._courses.filter(it => it.code !== code);
        await stdSetStorage(CustomCourseModel.STORAGE_KEY, this._courses);
    }
    public async pull() {
        const curr = [...this._courses];
        this._courses = await CustomCourseCloudService.pull();
        const codes = this._courses.map(it => it.code);
        curr.forEach(it => {
            if (!codes.includes(it.code)) this._courses.push(it);
        });
        await stdSetStorage(CustomCourseModel.STORAGE_KEY, this._courses);
    }
    public async push() {
        await CustomCourseCloudService.push(this._courses);
    }
}

function customCourseToEvent(customCourse: CustomCourse) {
    return {
        CEname: customCourse.name,
        CEcode: customCourse.code,
        TeachingWeekFormat: getWeeksText(customCourse.weeks).replace(/\s+/g, ''),
        PeriodFormat: `${customCourse.dayTime.period.start}-${customCourse.dayTime.period.end}`,
        WeekdayFormat: '一二三四五六日'.split('')[customCourse.dayTime.weekday],
        Content: customCourse.content
    } as _Event;
}

function eventToCustomCourse(event: _Event) {
    return {
        name: event.CEname,
        code: event.CEcode,
        content: event.Content,
        weeks: parseWeeksText(event.TeachingWeekFormat),
        dayTime: {
            weekday: '一二三四五六日'.indexOf(event.WeekdayFormat),
            period: parsePeriod(event.PeriodFormat)
        }
    } as CustomCourse;
}

function parsePeriod(period: string) {
    const tmp = period.split('-');
    return {
        start: parseInt(tmp[0]),
        end: parseInt(tmp[1])
    };
}

export default CustomCourseModel;

export type CustomCourse = {
    name: string
    code: string
    weeks: number[]
    dayTime: DayTime
    content: string
}

type _Event = {
    CEcode: string
    CEname: string
    PeriodFormat: string
    TeachingWeekFormat: string
    WeekdayFormat: string
    Content: string
}

// public async getCustom() {
//     if (!this._coursesInfo) this._coursesInfo = await this.load();
//     return this._coursesInfo.custom || [];
// }
// public async addCustom(course: Course) {
//     if (!this._coursesInfo) this._coursesInfo = await this.load();
//     if (!this._coursesInfo.custom) this._coursesInfo.custom = [];
//     this._coursesInfo.custom.push(course);
//     await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
//     this._coursesInfo = await this.load();
// }
// public async delCustom(name: string) {
//     if (!this._coursesInfo) this._coursesInfo = await this.load();
//     if (this._coursesInfo.custom === null) return;
//     this._coursesInfo.custom = this._coursesInfo.custom.filter(it => it.name !== name);
//     await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
//     this._coursesInfo = await this.load();
// }
// public async getPriority() {
//     if (!this._coursesInfo) this._coursesInfo = await this.load();
//     return this._coursesInfo.priority || [];
// }
// public async setPriority(code: string) {
//     if (!this._coursesInfo) this._coursesInfo = await this.load();
//     if (!this._coursesInfo.priority) this._coursesInfo.priority = [];
//     // 先清理
//     this._coursesInfo.priority = this._coursesInfo.priority.filter(it => it !== code);
//     this._coursesInfo.priority.push(code);
//     await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
//     this._coursesInfo = await this.load();
// }
// public async clearPriority(code: string) {
//     if (!this._coursesInfo) this._coursesInfo = await this.load();
//     if (!this._coursesInfo.priority) return;
//     this._coursesInfo.priority = this._coursesInfo.priority.filter(it => it !== code);
//     await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
//     this._coursesInfo = await this.load();
// }