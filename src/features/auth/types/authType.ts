export interface AuthParams {
    userId: string;
    password: string | undefined;
}

export interface AuthResponse {
    value:{
        login: UserLogin;
        token: UserToken;
        detail: UserDetail;
    }
}

export interface UserLogin {
    loginNo: number;
    loginType: string;
    loginUser: number;
    loginDt: string;
    logoutDt: string;
    loginIp: string;
    sessionId: string;
    platform: string | null;
}

export interface UserToken {
    tokenNo: number;
    loginNo: number;
    clientId: string;
    tokenIssueType: string;
    accessToken: string;
    refreshToken: string;
    authority: string;
    expiration: string;
    issueDt: string;
    secureKey: string | undefined;
}

export interface UserDetail {
    uno: number;
    id: string;
    name: string;
	email: string;
    instNo: number;
    role: string;
}



