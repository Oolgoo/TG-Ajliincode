import { UploadFile } from "antd";

export interface AnsDeleteParams {
    answNo?: number;
}

export interface AnsRegistParams {
    params: {
        answNo?:number;
        qustnNo?: number;
        answCn?: string;
    },
    files?: UploadFile[]
}

export interface MoreAnsResponse {
    addQustnNo: number;
    addAnswNo: number;
    answCn?: string;
    regId: string;
    nickNm?: string;
    regDt: string;
    mdfcnId?: string;
    mdfcnDt?: string;
}

export interface MoreAnsRegistParams{
    addQustnNo: number;
    addAnswNo?: number;
    answCn : string;
}
export interface MoreAnsDeleteParams{
    addAnswNo?:number;
}