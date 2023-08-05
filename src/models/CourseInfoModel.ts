import type StdModel from "@/core/StdModel";
import {stdRequest} from "@/core/network";

export enum SearchType {
    CourseName,
    TeacherName
}

export type CourseAbstract = {
    name: string
    code: string
    instructor: string | null
}

class CourseInfoModel implements StdModel {
    async query(searchType: SearchType, value: string) {
        const data = searchType === SearchType.CourseName ? { "course_name": value } : { "teacher_name": value };
        const res = await stdRequest<{ courses: _CourseInfo[] }>("/course_score_query/course", data, "GET");
        const _courseInfo = res.courses;
        return _courseInfo.map(it => {
            return { name: it.name, code: it.code, instructor: it.instructor } as CourseAbstract;
        });
    }
}
export default CourseInfoModel;

interface _CourseInfo {
    name: string
    code: string
    course_num: string
    dept: string
    credit: number
    instructor: string
    session: {
        id: number
        year: number
        is_autumn: boolean
    }
}
