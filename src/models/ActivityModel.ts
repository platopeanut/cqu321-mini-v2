import type StdModel from "@/core/StdModel";
import type {StdOldResponse} from "@/core/old";
import {stringToDateInChinaTime} from "@/utils/datetime";
import {stdGetStorage, stdSetStorage} from "@/core/storage";

export type ActivityInfo = {
    lastUpdate: Date
    pictures: ActivityItem[]
}

export type ActivityItem = {
    url: string
    contentUrl: string
    jumpType: string
}

class ActivityModel implements StdModel {
    private static STORAGE_KEY = "ActivityInfo";
    private _activityInfo: ActivityInfo | null = null;
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
                    jumpType: it.JumpType
                } as ActivityItem;
            })
        } as _RawActivityInfo;
    }
    private async _load() {
        try {
            const rawInfo = await stdGetStorage<_RawActivityInfo>(ActivityModel.STORAGE_KEY);
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