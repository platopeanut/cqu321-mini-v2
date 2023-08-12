import type StdModel from "@/core/StdModel";
import {stdRequest} from "@/core/network";

class LibraryModel implements StdModel {

    public async update() {
        const res = await Promise.all([
            stdRequest({
                url: "/library/borrow",
                data: { is_curr: true },
                method: "GET",
                showError: true
            }),
            stdRequest({
                url: "/library/borrow",
                data: { is_curr: false },
                method: "GET",
                showError: true
            })
        ]);
        console.log(res);
    }
}
export default LibraryModel;