import {stdRequest} from "@/core/network";
import stdUser from "../core/StdUser";
import type StdModel from "@/core/StdModel";
import {stdGetStorage, stdSetStorage} from "@/core/storage";

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
  private static STORAGE_KEY = "ExamsInfo";
  private _examInfoList: ExamInfo[] = [];
  public async update() {
    const sid = (await stdUser.getUserInfo()).sid;
    const res: any = await stdRequest(
      "/edu_admin_center/fetchExam",
      { "sid": sid }
    );
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
}
export default ExamModel;
