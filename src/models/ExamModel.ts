import stdUser from "../core/StdUser";
import type StdModel from "@/core/StdModel";
import {stdGetStorage, stdSetStorage} from "@/core/storage";
import {stdRequestHelper} from "@/core/common";

export type ExamInfo = {
  name: string
  code: string
  date: string
  startTime: string
  endTime: string
  classroom: string
  seatNum: string
}

class ExamModel implements StdModel {
  private static _instance: ExamModel | null = null;
  private constructor() {}
  public static getInstance() {
    if (this._instance === null)
      this._instance = new ExamModel();
    return this._instance;
  }
  public reload() { this._examInfoList = []; }
  private static STORAGE_KEY = "ExamsInfo";
  private _examInfoList: ExamInfo[] = [];
  public async update() {
    const sid = (await stdUser.getUserInfo()).sid;
    const res: any = await stdRequestHelper({
      requestOptions: {
        url: "/edu_admin_center/fetchExam",
        data: { "sid": sid }
      },
      showLoading: true,
      showError: true,
      loadingText: "更新中"
    });
    if (res === null) return;
    const exams: any[] = res.exams;
    this._examInfoList = exams.map(it => {
      return {
        name: it.course.name,
        code: it.course.code,
        date: it.date,
        startTime: it.start_time,
        endTime: it.end_time,
        classroom: it.room,
        seatNum: it.seat_num
      } as ExamInfo;
    });
    await this.save();
    await this.load();
  }
  private async save() {
    await stdSetStorage(ExamModel.STORAGE_KEY, this._examInfoList);
  }
  private async load() {
    try {
      this._examInfoList = await stdGetStorage<ExamInfo[]>(ExamModel.STORAGE_KEY);
    } catch (e) {
      this._examInfoList = [];
    }
  }
  public async get() {
    if (this._examInfoList.length === 0)
      await this.load();
    return this._examInfoList;
  }
  public getByName(name: string) {
    return this._examInfoList.find(it => it.name === name);
  }
  public async add(examInfo: ExamInfo) {
    const name = this.isSelfExam(examInfo.name) ? examInfo.name : examInfo.name + '🍒';
    // 清除已存在的相同名称
    this._examInfoList = this._examInfoList.filter(it => it.name !== name);
    examInfo.name = name;
    this._examInfoList.push(examInfo);
    await this.save();
    await this.load();
  }
  public isSelfExam(name: string) {
    return name.includes('🍒');
  }
  public async deleteByName(name: string) {
    this._examInfoList = this._examInfoList.filter(it => it.name !== name);
    await this.save();
    await this.load();
  }
}
export default ExamModel;
