import { UploadFile } from "antd";
import { CodeResponse, FileResponse, PaginateResult } from "common";
import { MoreAnsResponse } from "./ansTypes";

export interface AskInfo {
    qustnNo: number,
    qustnTtl: string,
    sympTypCd: string,
    sympKeywd: string,
    sympDtlCn: string,
    sympFileNo?: number, //증상 사진
    likeCnt: number, //좋아요 갯수
    viewCnt: number, //조회수
    delYn?: string, //삭제여부
    petNo: number, //동물번호
    petNm: string, //동물 이름
    typCd?: string, //유형
    bred?: string, //품종
    gndrCd: string, //성별코드
    neutYn?: string, //중성화 여부
    birthDay: string,
    age?: number,
    wght: string,
    srcPath?: string, //동물 pathurl
    nickNm?: string,
    regId: string;
    regDt: string;
    sympFileList?: any[];
    mdfcnId?: string;
    mdfcnDt?: string;
}

export interface AskListResponse extends CodeResponse {
    value: PaginateResult<AskInfo>;
}

export interface AskRegistParams {
    params: {
        qustnNo?: number;
        petNo: number; //펫 고유번호
        qustnTtl: string; //질문 제목
        sympTypCd: string; //질문 타입 코드 
        sympKeywd?: string; //질문 키워드
        sympDtlCn?: string; //질문 내용
        delYn?: string; //삭제 여부
    },
    files?: UploadFile[]
}

export interface AskRegistResponse<T> {
    value: T
}

export interface AskDeleteParams {
    qustnNo?: number;
}

export interface AskDetailResponse<T> {
    value: {
        detail: T;
        petData: PetResponse;
        ansDetail: AnsResponse;
        moreAskDetail: MoreAskResponse;
        moreAnsDetail: MoreAnsResponse;
        file?: FileResponse[];
    }
}

export interface PetResponse {
    petNo : number;
    petNm: string;
    typCd: string;
    bred?: string;
    gndrCd?:string;
    age?: number;
    wght?:string;
    neutYn?:string;
    regDt: string;
    regId: string;
    fileList?: any[]
}
export interface AnsResponse {
    answNo: number;
    qustnNo: number;
    answCn?: string;
    regId: string;
    nickNm?: string;
    regDt: string;
    mdfcnId?: string;
    mdfcnDt?: string;
}

export interface MoreAskResponse {
    qustnNo: number;
    addQustnNo: number;
    addQustnCn?: string;
    regId: string;
    nickNm?: string;
    regDt: string;
    mdfcnId?: string;
    mdfcnDt?: string;
}

export interface MoreAskRegistParams {
    qustnNo: number;
    addQustnCn: string;
    addQustnNo?: number;
}

export interface MoreAskDeleteParams {
    addQustnNo: number;
}