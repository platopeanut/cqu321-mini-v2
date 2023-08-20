import StdModel from "@/core/StdModel";
import {stdRequestHelper} from "@/core/common";

class LibraryModel extends StdModel {

    public async update() {
        const res = await Promise.all([
            stdRequestHelper({
                requestOptions: {
                    url: "/library/borrow",
                    data: { is_curr: true },
                    method: "GET"
                },
                showError: true
            }),
            stdRequestHelper({
                requestOptions: {
                    url: "/library/borrow",
                    data: { is_curr: false },
                    method: "GET"
                },
                showError: true
            })
        ]);
        console.log(res);
    }
}
export default LibraryModel;