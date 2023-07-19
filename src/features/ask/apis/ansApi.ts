import axiosInstance from "utils/axios";
import { AnsDeleteParams, AnsRegistParams, MoreAnsDeleteParams, MoreAnsRegistParams } from "../types/ansTypes";
import { AskDetailResponse, AskInfo } from "../types";
import { convertToFormData } from "lib";

// 답변 삭제
export const deleteAnsFn = async (params: AnsDeleteParams) => {
    const res = await axiosInstance.delete<AskDetailResponse<AskInfo>>(`/ans/delete`, { 
        data: params, headers: { "Content-Type": `application/json` } 
    });

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};

// 등록/수정
export const registAnsFn = async (param: AnsRegistParams) => {
    const formData = convertToFormData(param);
    const res = await axiosInstance.post(`/ans/regist`, formData, { 
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }
};

// 등록/수정
export const registMoreAnsFn = async (param: MoreAnsRegistParams) => {
    const res = await axiosInstance.post(`/ans/more/regist`, param);

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }
};

//추가 답변 삭제
export const deleteMoreAnsFn = async (params: MoreAnsDeleteParams) => {
    const res = await axiosInstance.delete<AskDetailResponse<AskInfo>>(`/ans/more/delete`, { 
        data: params, headers: { "Content-Type": `application/json` } 
    });

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};