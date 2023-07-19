import { atom } from "recoil";
import axiosInstance from "../../utils/axios";
import { FileParams, FileResponse } from "../types";

// 파일삭제
export const deleteFileFn = async (params: FileParams) => {
    const res = await axiosInstance.delete<FileResponse>(`/common/delete`, { 
        data: params, headers: { "Content-Type": `application/json` } 
    });

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }
};

export const userDataAtom = atom<any>({
    key: 'userDataAtom',
    default: undefined
})