import { UploadFile } from "antd";

export interface PetDataList {
    value: PetInfo[];
}

export interface PetInfo {
    petNo?: number;
    petNm?: string;
    typCd?: string;
    bred?: string;
    gndrCd?: string;
    neutYn?: string;
    age?: number;
    birthDay?: string;
    wght?: string;
    regId?: string;
    regDt?: string;
}

export interface SymptRegDetail {
    petNo: number;
    qustnTtl: string;
    sympTypCd: string;
    sympKeywd?: string;
    sympDtlCn?: string;
    delYn: string;
}

export interface PetRegistParams {
    params: {
        petNm?: string;
        typCd?: string;
        bred?: string;
        gndrCd?: string;
        neutYn?: string;
        age?: number;
        birthDay?: string;
        wght?: string;
    },
    files?: UploadFile[]
}

export interface PetRegistResponse<T> {
    value: T
}