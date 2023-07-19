import axiosInstance from "utils/axios";
import { PetDataList, PetInfo, PetRegistParams, PetRegistResponse } from "../types";
import { convertToFormData } from "lib";

// 상세조회
export const getMyPetListFn = async () => {
    const res = await axiosInstance.get<PetDataList>(`/pet`);

    switch(res.status) {
        case 200:
            return res.data.value;
        default:
            return res.data.value;
    }
};

export const registPetFn = async (param: PetRegistParams) =>{

    const formData = convertToFormData(param);
    const res = await axiosInstance.post<PetRegistResponse<PetInfo>>(`/pet/regist`, formData, { 
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }

}