import type StdModel from "@/core/StdModel";
import {oldRequestV1} from "@/core/old";
import type {DayTime} from "@/models/CourseModel";

export class CustomCourseCloudService {
    private static async getCode() {
        const res = await uni.login();
        return res.code;
    }
    public static async push(customCourses: CustomCourse[]) {
        const code = await this.getCode();
        await oldRequestV1({
            url: "/course_table/push_custom_event",
            data: {
                'Code': code,
                'Events': customCoursesToEvents(customCourses),
            }
        });
    }
    public static async pull() {
        const code = await this.getCode();
        const res = await oldRequestV1({
            url: "/course_table/pull_custom_event",
            data: {
                'Code': code,
            }
        });
        console.log(res);
    }
}

class CustomCourseModel implements StdModel {

}

function customCoursesToEvents(customCourses: CustomCourse[]) {
    return customCourses.map(it => {
        return {
            CEname: it.name,
            CEcode: it.code,
            PeriodFormat: "",
            TeachingWeekFormat: "",
            WeekdayFormat: "",
            Content: it.content
        } as _Event;
    });
}

function eventsToCustomCourses(events: _Event[]) {
    return events.map(it => {
        return {
            name: it.CEname,
            code: it.CEcode,
            content: it.Content,
            weeks: [],
            dayTime: {
                period: {end: 0, start: 0}, weekday: 0
            }
        } as CustomCourse;
    });
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