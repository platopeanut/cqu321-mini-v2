import StdModel from "@/core/StdModel";
import {stdRequestHelper} from "@/core/common";

class LibraryModel extends StdModel {

    public async update(isCurr=true) {
        const res = await stdRequestHelper({
            requestOptions: {
                url: "/library/borrow",
                data: { is_curr: isCurr },
                method: "GET"
            },
            showError: true
        });
        return convertToBookInfos(res);
    }
}
export default LibraryModel;

function convertToBookInfos(res: any): BookInfo[] {
    return res.book_infos.map((it: any) => {
       return {
           borrowTime: it.borrow_time,
           callNo: it.call_no,
           canRenew: it.can_renew,
           id: it.id,
           isReturn: it.is_return,
           libraryName: it.library_name,
           renewCount: it.renew_count,
           returnTime: it.return_time,
           shouldReturnTime: it.should_return_time,
           title: it.title
       } as BookInfo;
    });
}

export type BookInfo = {
    id: number | null   // 书籍id
    title: string   // 书籍名称
    callNo: string  // 书籍检索号
    libraryName: string // 所属图书馆
    borrowTime: string // 借出时间
    shouldReturnTime: string | null // 应归还日期
    isReturn: boolean // 是否被归还
    returnTime: string | null // 归还时间
    renewCount: number // 续借次数
    canRenew: boolean // 是否可被续借
}
