import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cookies } from "react-cookie";
import authVeryfy from './authVeryfy';
import { AuthResponse } from '../features/auth';

const env = `${process.env.REACT_APP_ENV}`;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods' : 'POST, GET, DELETE'
    },
})

/** 요청 전 - accessToken 있는데 만료 시 refreshToken으로 accessToken 재발행 */
axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const cookie = new Cookies();
        const accessToken = sessionStorage.getItem("accessToken");
        const refreshToken = (env === "dev") ? sessionStorage.getItem("refreshToken") : cookie.get("refreshToken")

        if(accessToken && refreshToken) {
            if(authVeryfy(accessToken) === 'Access Token Expired'){
                const params = { 
                    refreshToken: refreshToken
                };

                const res = await axios.post<AuthResponse>(`${process.env.REACT_APP_API_ROOT}/auth/refresh`, params, {
                    headers: { "Content-Type": `application/json` }
                });

                config.headers = { 'access-token' : `${res.data.value.token.accessToken}` };
                sessionStorage.setItem("accessToken", `${res.data.value.token.accessToken}`);
            } else {
                config.headers = { 'access-token' : `${accessToken}` };
            }
        } 

        return config
    }, 
    (error: any) => {
        console.error('[ERROR] axiosInstance.interceptors.request ...', error.request || error);
        //Cookie.remove("refreshToken");
        return Promise.reject(error)
    }
);

/** 응답 전 - 신규 accessToken 교체 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error: any) => {
        console.error('[ERROR] axiosInstance.interceptors.response ...', error.response || error);

        console.log(error.response.data.code)

        // 토큰 정보가 유효하지 않습니다.
        if (error.response.status === 401 || error.response.data.code === 401) {
            // 로그아웃 처리
            // 로그인 페이지로 이동처리
            sessionStorage.removeItem('accessToken');
            if(env === "dev") sessionStorage.removeItem("refreshToken");
        } 

        return Promise.reject(error)
    }
);

export default axiosInstance;