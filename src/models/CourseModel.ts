import {stdRequest} from "@/core/network";
import {stdGetStorage, stdSetStorage} from "@/core/storage";
import type StdModel from "@/core/StdModel";
import stdUser from "@/core/StdUser";

type CoursesInfo = {
  currTerm: CoursesData | null
  nextTerm: CoursesData | null
};

export enum TermOffset {
  CurrTerm,
  NextTerm
}

class CourseModel implements StdModel {

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

  public async update(termOffset: TermOffset = TermOffset.CurrTerm) {
    const sid = (await stdUser.getUserInfo()).sid;
    const _courses = await stdRequest<_Courses>(
      "/edu_admin_center/fetchCourseTimetable",
      { "code": sid, "offset": termOffset }
    );
    // console.log(_courses);
    await this.save(termOffset, {
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
      coursesInfo = { currTerm: null, nextTerm: null };
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

}
export default CourseModel;

export interface CoursesData {
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
  dayTime: {
    weekday: number
    period: {
      start: number
      end: number
    }
  }
}
interface _Courses {
  timetables: _Timetable[]
  start_date: string
  end_date: string
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