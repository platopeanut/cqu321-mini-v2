import StdModel from "@/core/StdModel";
import type {StdOldResponse} from "@/core/old";
import {stringToDateInChinaTime} from "@/utils/datetime";
import {downloadAndSaveFile, stdGetStorage, stdSetStorage} from "@/core/storage";
import {getImgUrl} from "@/core/old";

export type ActivityInfo = {
    lastUpdate: Date
    pictures: ActivityItem[]
}

export type ActivityItem = {
    url: string
    localUrl: string | null
    contentUrl: string
    jumpType: string
}

class ActivityModel extends StdModel {
    private static STORAGE_KEY = "ActivityInfo";
    private static _instance: ActivityModel | null = null;
    private _activityInfo: ActivityInfo | null = null;
    private constructor() { super(); }
    public static getInstance() {
        if (this._instance === null)
            this._instance = new ActivityModel();
        return this._instance;
    }
    public clear(): void { this._activityInfo = null; }
    private async _update() {
        const res = await uni.request({
            url: 'https://www.zhulegend.com/321CQU/homepage',
            data: { 'Key': 'CQUz5321', 'Version': '2.1'},
            method: "POST"
        });
        if (res.statusCode !== 200) {
            await uni.showToast({
                title: "获取活动失败",
                icon: "error"
            });
            return null;
        }
        const response = res.data as StdOldResponse<_ActivityInfo>;
        if (response.Statue !== 1) return null;
        return {
            lastUpdate: response.data.LastUpdate,
            pictures: response.data.Pictures.map(it => {
                return {
                    url: it.Url,
                    contentUrl: it.ContentUrl,
                    jumpType: it.JumpType,
                    localUrl: null
                } as ActivityItem;
            })
        } as _RawActivityInfo;
    }
    private async _downloadImages(rawActivityInfo: _RawActivityInfo) {
        rawActivityInfo.pictures = await Promise.all(rawActivityInfo.pictures.map(async it => {
            if (it.localUrl === null) it.localUrl = await downloadAndSaveFile(getImgUrl(it.url));
            return it;
        }));
        return rawActivityInfo;
    }
    private async _load() {
        try {
            let rawInfo = await stdGetStorage<_RawActivityInfo>(ActivityModel.STORAGE_KEY);
            const oldCnt = rawInfo.pictures
                .reduce((prev, curr) => prev + (curr.localUrl === null ? 0 : 1), 0);
            const rawInfo2 = await this._downloadImages(rawInfo);
            const newCnt = rawInfo2.pictures
                .reduce((prev, curr) => prev + (curr.localUrl === null ? 0 : 1), 0);
            if (newCnt !== oldCnt) {
                rawInfo = rawInfo2;
                await stdSetStorage(ActivityModel.STORAGE_KEY, rawInfo);
            }
            this._activityInfo = {
                lastUpdate: stringToDateInChinaTime(rawInfo.lastUpdate),
                pictures: rawInfo.pictures
            };
        } catch (e) {
            this._activityInfo = null;
        }
    }
    public async update() {
        await stdSetStorage(ActivityModel.STORAGE_KEY, await this._update());
        await this._load();
    }
    public async get() {
        if (this._activityInfo === null) {
            await this._load();
            if (this._activityInfo === null)
                await this.update();
        }
        return this._activityInfo;
    }
}

type _ActivityInfo = {
    LastUpdate: string
    Pictures: {
        Url: string
        ContentUrl: string
        JumpType: string
    }[]
}

type _RawActivityInfo = {
    lastUpdate: string
    pictures: ActivityItem[]
}


export default ActivityModel;