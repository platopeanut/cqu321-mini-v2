import {stdGetStorage, stdSetStorage} from "@/core/storage";
import type StdModel from "@/core/StdModel";
import stdUser from "@/core/StdUser";
import {stdRequestHelper} from "@/core/common";

type CoursesInfo = {
  currTerm: CoursesData | null
  nextTerm: CoursesData | null
  custom: Course[] | null
  priority: string[] | null
};

export enum TermOffset {
  CurrTerm,
  NextTerm
}

class CourseModel implements StdModel {
  private static _instance: CourseModel | null = null;
  private constructor() {}
  public static getInstance() {
    if (this._instance === null)
      this._instance = new CourseModel();
    return this._instance;
  }
  public reload() { this._coursesInfo = null; }
  private static STORAGE_KEY = "CoursesInfo";

  private _coursesInfo: CoursesInfo | null = null;

  public async get(termOffset: TermOffset): Promise<CoursesData | null> {
    if (!this._coursesInfo) this._coursesInfo = await this.load();
    if (termOffset === TermOffset.CurrTerm)
      return this._coursesInfo.currTerm;
    else if (termOffset === TermOffset.NextTerm)
      return this._coursesInfo.nextTerm;
    else return null;
  }
  public getTermNames() {
    return {
      curr: this._coursesInfo?.currTerm?.termName || null,
      next: this._coursesInfo?.nextTerm?.termName || null
    }
  }

  public async update(termOffset: TermOffset = TermOffset.CurrTerm) {
    const info = await stdUser.getUserInfo();
    if (info === null) return;
    const sid = info.sid;
    const _courses = await stdRequestHelper<_Courses>({
      requestOptions: {
        url: "/edu_admin_center/fetchCourseTimetable",
        data: { "code": sid, "offset": termOffset }
      },
      showLoading: true,
      showError: true,
      loadingText: "更新中"
    });
    if (_courses === null) return;
    await this.save(termOffset, {
      termName: _courses.session_name,
      startDate: _courses.start_date,
      endDate: _courses.end_date,
      courses: _courses.timetables.map(it => convertCourses(it))
    });
    this._coursesInfo = await this.load();
  }

  private async load() {
    let coursesInfo: CoursesInfo;
    try {
      coursesInfo = await stdGetStorage<CoursesInfo>(CourseModel.STORAGE_KEY);
    } catch (e) {
      coursesInfo = { currTerm: null, nextTerm: null, custom: null, priority: null };
    }
    return coursesInfo;
  }

  private async save(termOffset: TermOffset, coursesData: CoursesData) {
    const coursesInfo = await this.load();
    if (termOffset === TermOffset.CurrTerm)
      coursesInfo.currTerm = coursesData;
    else if (termOffset === TermOffset.NextTerm)
      coursesInfo.nextTerm = coursesData;
    await stdSetStorage(CourseModel.STORAGE_KEY, coursesInfo);
    this._coursesInfo = await this.load();
  }
  public async getCustom() {
    if (!this._coursesInfo) this._coursesInfo = await this.load();
    return this._coursesInfo.custom || [];
  }
  public async addCustom(course: Course) {
    if (!this._coursesInfo) this._coursesInfo = await this.load();
    if (!this._coursesInfo.custom) this._coursesInfo.custom = [];
    this._coursesInfo.custom.push(course);
    await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
    this._coursesInfo = await this.load();
  }
  public async delCustom(name: string) {
    if (!this._coursesInfo) this._coursesInfo = await this.load();
    if (this._coursesInfo.custom === null) return;
    this._coursesInfo.custom = this._coursesInfo.custom.filter(it => it.name !== name);
    await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
    this._coursesInfo = await this.load();
  }
  public async getPriority() {
    if (!this._coursesInfo) this._coursesInfo = await this.load();
    return this._coursesInfo.priority || [];
  }
  public async setPriority(code: string) {
    if (!this._coursesInfo) this._coursesInfo = await this.load();
    if (!this._coursesInfo.priority) this._coursesInfo.priority = [];
    // 先清理
    this._coursesInfo.priority = this._coursesInfo.priority.filter(it => it !== code);
    this._coursesInfo.priority.push(code);
    await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
    this._coursesInfo = await this.load();
  }
  public async clearPriority(code: string) {
    if (!this._coursesInfo) this._coursesInfo = await this.load();
    if (!this._coursesInfo.priority) return;
    this._coursesInfo.priority = this._coursesInfo.priority.filter(it => it !== code);
    await stdSetStorage(CourseModel.STORAGE_KEY, this._coursesInfo);
    this._coursesInfo = await this.load();
  }
}
export default CourseModel;

export interface CoursesData {
  termName: string
  startDate: string
  endDate: string
  courses: Course[]
}
export interface Course {
  name: string
  classroom: string
  instructor: string
  code: string
  courseNum: string
  credit: number
  weeks: number[]
  dayTime: DayTime
}
export type DayTime = {
  weekday: number
  period: {
    start: number
    end: number
  }
}
interface _Courses {
  timetables: _Timetable[]
  start_date: string
  end_date: string
  session_name: string
}
interface _Timetable {
  course: _Course
  weeks: { start: number, end: number }[]
  whole_week: boolean
  expr_projects: string[]
  stu_num: number | null
  classroom: string | null
  classroom_name: string | null
  day_time: _DayTime | null
}
interface _Course {
  name: string | null
  code: string | null
  course_num: string | null
  dept: string | null
  credit: number | null
  instructor: string | null
  session: _Session | null
}
interface _Session {
  id: number | null
  year: number
  is_autumn: boolean
}
interface _DayTime {
  weekday: number
  period: { start: number, end: number }
}

function convertCourses(timetable: _Timetable): Course {
  return {
    classroom: (timetable.classroom_name || "") + (timetable.classroom || ""),
    code: timetable.course.code || "",
    courseNum: timetable.course.course_num || "",
    credit: timetable.course.credit || -1,
    instructor: timetable.course.instructor || "",
    name: timetable.course.name || "",
    dayTime: {
      weekday: timetable.day_time?.weekday || 0,
      period: {
        start: timetable.day_time?.period.start || -1,
        end: timetable.day_time?.period.end || -1
      }
    },
    weeks: (() => {
      const weekSet = new Set<number>();
      timetable.weeks.forEach(it => {
        for (let i = it.start; i <= it.end; i++) { weekSet.add(i); }
      });
      return Array.from(weekSet).sort((a, b) => a - b);
    })()
  }
}