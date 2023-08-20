import {stdGetStorage, stdSetStorage} from "@/core/storage";
import StdModel from "@/core/StdModel";
import stdUser from "@/core/StdUser";
import {stdRequestHelper} from "@/core/common";

type CoursesInfo = {
  currTerm: CoursesData | null
  nextTerm: CoursesData | null
  currSelectTerm: TermOffset | null
};

export enum TermOffset {
  CurrTerm,
  NextTerm
}

class CourseModel extends StdModel {
  private static _instance: CourseModel | null = null;
  private constructor() { super(); }
  public static getInstance() {
    if (this._instance === null) this._instance = new CourseModel();
    return this._instance;
  }

  private static STORAGE_KEY = "CoursesInfo";
  private _data = new Map<TermOffset, CoursesData>();
  private _currSelectTerm: TermOffset | null = null;

  public clear() {
    this._data = new Map<TermOffset, CoursesData>();
    this._currSelectTerm = null;
  }
  public async getTermNames() {
    // 代价很小，在内存的数据会立即返回
    await this.getCoursesData(TermOffset.CurrTerm);
    await this.getCoursesData(TermOffset.NextTerm);
    return {
      curr: this._data.get(TermOffset.CurrTerm)?.termName || null,
      next: this._data.get(TermOffset.NextTerm)?.termName || null
    };
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
    await this._setCoursesData(termOffset, {
      termName: _courses.session_name,
      startDate: _courses.start_date,
      endDate: _courses.end_date,
      courses: _courses.timetables.map(it => convertCourses(it))
    });
  }
  private async _setCoursesData(termOffset: TermOffset, coursesData: CoursesData) {
    const key = termOffset === TermOffset.CurrTerm ? '-Curr' : '-Next';
    await stdSetStorage(CourseModel.STORAGE_KEY + key, coursesData);
    this._data.set(termOffset, coursesData);
  }
  public async getCoursesData(termOffset: TermOffset) {
    if (this._data.has(termOffset)) return this._data.get(termOffset)!;
    const key = termOffset === TermOffset.CurrTerm ? '-Curr' : '-Next';
    try {
      const data = await stdGetStorage<CoursesData>(CourseModel.STORAGE_KEY + key);
      this._data.set(termOffset, data);
    } catch (e) {
      this._data.delete(termOffset);
    }
    return this._data.get(termOffset) || null;
  }
  public async getCurrSelectTerm() {
    if (this._currSelectTerm !== null) return this._currSelectTerm;
    try {
      this._currSelectTerm = await stdGetStorage<TermOffset>(CourseModel.STORAGE_KEY + '-SelectTerm');
    } catch (e) {
      this._currSelectTerm = TermOffset.CurrTerm;
    }
    return this._currSelectTerm;
  }
  public async setCurrSelectTerm(currSelectTerm: TermOffset) {
    await stdSetStorage(CourseModel.STORAGE_KEY + '-SelectTerm', currSelectTerm);
    this._currSelectTerm = currSelectTerm;
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
  day_time: DayTime | null
}
interface _Course {
  name: string | null
  code: string | null
  course_num: string | null
  dept: string | null
  credit: number | null
  instructor: string | null
  session: {
    id: number | null
    year: number
    is_autumn: boolean
  } | null
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