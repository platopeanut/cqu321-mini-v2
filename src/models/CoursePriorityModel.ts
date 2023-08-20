import type StdModel from "@/core/StdModel";
import {stdGetStorage, stdSetStorage} from "@/core/storage";

class CoursePriorityModel implements StdModel {
    private static _instance: CoursePriorityModel | null = null;
    private constructor() {}
    public static getInstance() {
        if (this._instance === null) this._instance = new CoursePriorityModel();
        return this._instance;
    }

    private static STORAGE_KEY = "CoursePriority";
    private _priorityList: string[] | null = null;
    public reload() { this._priorityList = null; }
    public async load() {
        if (this._priorityList !== null) return;
        try {
            this._priorityList = await stdGetStorage<string[]>(CoursePriorityModel.STORAGE_KEY);
        } catch (e) {
            this._priorityList = [];
        }
    }
    public async add(code: string) {
        await this.load();
        // 先清除掉之前的（如果有）
        this._priorityList = this._priorityList!.filter(it => it !== code);
        this._priorityList.push(code); // 数组元素越后面优先级越高
        await stdSetStorage(CoursePriorityModel.STORAGE_KEY, this._priorityList);
    }
    public async del(code: string) {
        await this.load();
        this._priorityList = this._priorityList!.filter(it => it !== code);
        console.log('hello', this._priorityList)
        await stdSetStorage(CoursePriorityModel.STORAGE_KEY, this._priorityList);
    }
    public has(code: string) {
        if (this._priorityList === null) return false;
        return this._priorityList!.includes(code);
    }
    /**
     * 比较两个code的优先级
     * (!!! 注意调用此函数之前一定要先调用load函数)
     * @param {string} code1
     * @param {string} code2
     * @return {number}
     */
    public compare(code1: string, code2: string) {
        const idx1 = this._priorityList!.indexOf(code1);
        const idx2 = this._priorityList!.indexOf(code2);
        return idx1 - idx2;
    }
}
export default CoursePriorityModel;