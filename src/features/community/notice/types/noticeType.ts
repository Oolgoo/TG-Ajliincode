import { PaginateResult, CodeResponse, FileResponse } from "common";

export interface NoticeInfo {
    ntcNo: number;
    ntcNm: string;
    ntcTtl: string;
    ntcCn: string;
    mbrNm: string;
    mainExpsrYn: string;
    mainExpsrBgngDt: string;
    mainExpsrEndDt: string;
    mainExpsrLmtYn: string;
    delYn: string;
    fileNo: number;
    inqCnt: number;
    regId: string;
    regDt: string;
}

export interface NoticeListResponse extends CodeResponse {
    value: PaginateResult<NoticeInfo>;
}

export interface NoticeRegistParams {
    params: {
        ntcNm: string;
        ntcCn: string;
        mainExpsrYn: string;
        mainExpsrBgngDt?: string;
        mainExpsrEndDt?: string;
        mainExpsrLmtYn?: string;
        delYn: string;
    },
    // files: UploadFile[]
}

export interface NoticeRegistResponse<T> {
    value: T
}

export interface NoticeDeleteParams {
    ntcNo?: number;
}

export interface NoticeDetailResponse<T> {
    value: {
        detail : T
        file: FileResponse[];
    }
}