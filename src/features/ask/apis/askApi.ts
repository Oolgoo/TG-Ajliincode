import axiosInstance from "utils/axios";
import { AskDeleteParams, AskDetailResponse, AskInfo, AskListResponse, AskRegistParams, AskRegistResponse, MoreAskDeleteParams, MoreAskRegistParams } from "..";
import { FilterParams } from "common";
import { convertToFormData } from "lib";

// 추천 질문 목록조회
export const getAskRecFn = async () => {
    const res = await axiosInstance.get<AskListResponse>('/ask/rec');
    
    switch(res.status) {
        case 200:
            return res.data;
        case 204:
            return {
                code: 204,
                codeStr: '204',
                status: 'No Data',
                value: {}
            }
        default:
            return res.data;
    }
};

// 목록조회
export const getAskAllFn = async (filter: FilterParams) => {
    const res = await axiosInstance.get<AskListResponse>('/ask', { params: filter });
    
    switch(res.status) {
        case 200:
            return res.data;
        case 204:
            return {
                code: 204,
                codeStr: '204',
                status: 'No Data',
                value: {}
            }
        default:
            return res.data;
        }    
};

// 질문 등록/수정
export const registAskFn = async (param: AskRegistParams) => {
    const formData = convertToFormData(param);
    const res = await axiosInstance.post<AskRegistResponse<AskInfo>>(`/ask/regist`, formData, { 
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }
};

// 상세조회
export const getAskDetailFn = async (qustnNo: string | undefined) => {
    const res = await axiosInstance.get<AskDetailResponse<AskInfo>>(`/ask/${qustnNo}`);

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};

// 삭제
export const deleteAskFn = async (params: AskDeleteParams) => {
    const res = await axiosInstance.delete<AskDetailResponse<AskInfo>>(`/ask/delete`, { 
        data: params, headers: { "Content-Type": `application/json` } 
    });

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};

//추가 질문 등록/수정
export const registMoreAskFn = async (param: MoreAskRegistParams) => {
    const res = await axiosInstance.post(`/ask/more/regist`, param);

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }
};

//추가 답변 삭제
export const deleteMoreAskFn = async (params: MoreAskDeleteParams) => {
    const res = await axiosInstance.delete<AskDetailResponse<AskInfo>>(`/ask/more/delete`, { 
        data: params, headers: { "Content-Type": `application/json` } 
    });

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};