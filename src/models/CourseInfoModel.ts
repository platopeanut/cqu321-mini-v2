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

export type CourseDetail = {
    name: string
    code: string
    details: Detail[]
}

export type Detail = {
    teacherName: string
    details: {
        termName: string
        isHierarchy: boolean
        max: number
        min: number
        average: number
        num: number
        levels: [number, number, number, number, number]
    }[]
}

class CourseInfoModel implements StdModel {
    static async query(searchType: SearchType, value: string) {
        const data = searchType === SearchType.CourseName ? { "course_name": value } : { "teacher_name": value };
        const res = await stdRequest<{ courses: _CourseInfo[] }>("/course_score_query/course", data, "GET");
        const _courseInfo = res.courses;
        return _courseInfo.map(it => {
            return { name: it.name, code: it.code, instructor: it.instructor } as CourseAbstract;
        });
    }

    static async queryDetail(code: string) {
        const res = await stdRequest<_CourseDetail>(`/course_score_query/course/${code}`, {}, "GET");
        return {
            name: res.course_name,
            code: res.course_code,
            details: res.score_details.map(it => {
                return {
                    teacherName: it.teacher_name,
                    details: it.details.map(item => {
                        return {
                            termName: `${item.term.year}${item.term.is_autumn ? '秋' : '春'}`,
                            isHierarchy: item.is_hierarchy,
                            num: item.num,
                            max: item.max,
                            min: item.min,
                            average: item.average,
                            levels: [
                                item.level1_num,
                                item.level2_num,
                                item.level3_num,
                                item.level4_num,
                                item.level5_num
                            ]
                        };
                    })
                };
            })
        } as CourseDetail;
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

interface _CourseDetail {
    course_code: string
    course_name: string
    score_details: {
        teacher_name: string
        details: {
            term: {
                id: number
                year: number
                is_autumn: boolean
            }
            is_hierarchy: boolean
            max: number
            min: number
            average: number
            num: number
            level1_num: number
            level2_num: number
            level3_num: number
            level4_num: number
            level5_num: number
        }[]
    }[]
}
