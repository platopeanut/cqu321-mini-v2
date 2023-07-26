import {stdRequest} from "@/core/network";
import stdUser from "../core/StdUser";
import type StdModel from "@/core/StdModel";

class ExamModel implements StdModel {
  async update() {
    const sid = (await stdUser.getUserInfo()).sid;
    const x = await stdRequest(
      "/edu_admin_center/fetchExam",
      { "sid": sid }
    );
    console.log(x);
  }
}

export default new ExamModel();
