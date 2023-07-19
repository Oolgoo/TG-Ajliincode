import axiosInstance from "utils/axios";
import { AuthParams, AuthResponse } from "../types/authType";

export const loginUserFn = async (params: AuthParams) => {
    const res = await axiosInstance.post<AuthResponse>('/auth/login',  params );

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }
};

export const refreshAccessTokenFn = async (refreshToken: string) => {
    const res = await axiosInstance.get<AuthResponse>(`/auth/refresh?refreshToken=${refreshToken}`);

    switch(res.status) {
        case 200:
            return res.data;
        default:
            return res.data;
    }
};