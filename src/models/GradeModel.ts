import {stdRequest} from "@/core/network";
import {stdGetStorage, stdSetStorage} from "@/core/storage";
import {tryParseNumber} from "@/utils/util";
import StdModel from "@/core/StdModel";
import stdUser from "@/core/StdUser";

export type ScoreItem = {
    name: string
    credit: number
    score: number | string
    instructor: string
    session: {
        year: number
        isAutumn: boolean
    }
    tags: {
        studyNature: string
        courseNature: string
    }
    moreInfo: {
        dept: string
        code: string
        courseNum: string
    }
}

export type GpaInfo = {
    gpa: number
    weightedAvg: number
    majorRanking: number | null
    gradeRanking: number | null
    classRanking: number | null
    minorGpa: number | null
    minorWeightedAvg: number | null
}

export type GradeInfo = {
    gpaInfo: GpaInfo | null,
    scoreItems: ScoreItem[]
}

export enum GpaType {
    FOUR,   // 四分制
    FIVE    // 五分制
}

class GradeModel extends StdModel {
    private static STORAGE_KEY = "ScoreItems";
    private static _instance: GradeModel | null = null;
    private _gradeInfo: GradeInfo | null = null;
    private constructor() { super(); }
    public static getInstance() {
        if (this._instance === null)
            this._instance = new GradeModel();
        return this._instance;
    }
    public clear() { this._gradeInfo = null; }
    public async get() {
        if (this._gradeInfo === null) {
            this._gradeInfo = await this.load();
        }
        return this._gradeInfo;
    }

    public async update() {
        const info = await stdUser.getUserInfo();
        if (info === null) return;
        const sid = info.sid;
        const [scoresData, gpaData] = await Promise.all([
            stdRequest<{scores: _Score[]}>({
                url: "/edu_admin_center/fetchScore",
                data: { "sid": sid, "is_minor": true }
            }),
            stdRequest<_GpaInfo>({ url: "/edu_admin_center/fetchGpaRanking" })
        ]);
        await this.save({
            gpaInfo: {
                gpa: gpaData.gpa,
                weightedAvg: gpaData.weighted_avg,
                majorRanking: gpaData.major_ranking,
                gradeRanking: gpaData.grade_ranking,
                classRanking: gpaData.class_ranking,
                minorGpa: gpaData.minor_gpa,
                minorWeightedAvg: gpaData.minor_weighted_avg
            },
            scoreItems: scoresData.scores
                .filter(it => it.course.name)
                .map(it => {
                return {
                    name: it.course.name ?? "",
                    credit: it.course.credit ?? 0,
                    score: tryParseNumber(it.score ?? ""),
                    instructor: it.course.instructor ?? "",
                    session: {
                        year: it.session.year,
                        isAutumn: it.session.is_autumn
                    },
                    tags: {
                        studyNature: it.study_nature,
                        courseNature: it.course_nature
                    },
                    moreInfo: {
                        dept: it.course.dept ?? "",
                        code: it.course.code ?? "",
                        courseNum: it.course.course_num ?? ""
                    }
                };
            }
            )
        });
        this._gradeInfo = await this.load();
    }

    private async load() {
        let gradeInfo: GradeInfo;
        try {
            gradeInfo = await stdGetStorage<GradeInfo>(GradeModel.STORAGE_KEY);
        } catch (e) { gradeInfo = { gpaInfo: null, scoreItems: [] }; }
        return gradeInfo;
    }

    private async save(gradeInfo: GradeInfo) {
        await stdSetStorage(GradeModel.STORAGE_KEY, gradeInfo);
    }
}

export default GradeModel;

interface _Score {
    session: _Session
    course: _Course
    score: string | null
    study_nature: string
    course_nature: string
}

interface _Session {
    id: number | null
    year: number
    is_autumn: boolean
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

interface _GpaInfo {
    gpa: number
    weighted_avg: number
    major_ranking: number | null
    grade_ranking: number | null
    class_ranking: number | null
    minor_gpa: number | null
    minor_weighted_avg: number | null
}
