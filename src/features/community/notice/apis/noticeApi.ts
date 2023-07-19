import { FilterParams } from "common";
import { NoticeDeleteParams, NoticeDetailResponse, NoticeInfo, NoticeRegistParams, NoticeRegistResponse, NoticeListResponse } from "../types/noticeType";
import axiosInstance from "utils/axios";
import { convertToFormData } from "lib";

// 목록조회
export const getAllNoticesFn = async (filter: FilterParams) => {
    const res = await axiosInstance.get<NoticeListResponse>('/ntc', { params: filter });
    
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

// 등록/수정
export const registNoticeFn = async (param: NoticeRegistParams) => {
    const formData = convertToFormData(param);
    const res = await axiosInstance.post<NoticeRegistResponse<NoticeInfo>>(`/ntc/regist`, formData, { 
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
export const getNoticeFn = async (ntcNo: string | undefined) => {
    const res = await axiosInstance.get<NoticeDetailResponse<NoticeInfo>>(`/ntc/${ntcNo}`);

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};

// 삭제
export const deleteNoticeFn = async (params: NoticeDeleteParams) => {
    const res = await axiosInstance.delete<NoticeDetailResponse<NoticeInfo>>(`/ntc/delete`, { 
        data: params, headers: { "Content-Type": `application/json` } 
    });

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};