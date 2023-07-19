export const ROUTE_ROOT = '';          
export const ROUTE_LOGIN = '/login';

export const ROUTE_JOIN = '/join';

export const ROUTE_FIND_ACCOUNT = '/find'

/** 메인 */
export const ROUTE_MAIN = `/`;

/** 소개페이지 **/
export const ROUTE_INTRO = `/intro`;

/** 실시간 상담 - 실시간 상담 접수 */
export const ROUTE_RECEPTION = `/reception`; 
export const ROUTE_RECEPTION_CREATE = `${ROUTE_RECEPTION}/create`; 

/** 실시간 상담 - 실시간 상담 */
export const ROUTE_REALTIME = `/realtime`; 


/** 묻고답하기 */
export const ROUTE_ASK = `/ask`;
export const ROUTE_ASK_DETAIL = `${ROUTE_ASK}/:id`; 
export const ROUTE_ASK_DETAIL_WITH_ID = (id: number) => `${ROUTE_ASK}/${id}`;  
export const ROUTE_ASK_UPDATE = `${ROUTE_ASK}/update/:id`; 
export const ROUTE_ASK_UPDATE_WITH_ID = (id: number) => `${ROUTE_ASK}/update/${id}`;  


/** 커뮤니티 - 공지사항 */
export const ROUTE_NOTICE = `/notice`; 
export const ROUTE_NOTICE_CREATE = `${ROUTE_NOTICE}/create`;
export const ROUTE_NOTICE_UPDATE = `${ROUTE_NOTICE}/update/:id`;
export const ROUTE_NOTICE_UPDATE_WITH_ID = (id: number) => `${ROUTE_NOTICE}/update/${id}`;
export const ROUTE_NOTICE_DETAIL = `${ROUTE_NOTICE}/:id`;
export const ROUTE_NOTICE_DETAIL_WITH_ID = (id: number) => `${ROUTE_NOTICE}/${id}`;


/** 커뮤니티 - 자주묻는 질문 */
export const ROUTE_FAQ = `/faq`; 

/** 마이페이지(보호자) - My질문내역 */
export const ROUTE_USER_ASK = `/user/ask`; 

/** 마이페이지(보호자) - My상담내역 */
export const ROUTE_USER_CONSULT = `/user/consult`; 

/** 마이페이지(보호자) - 반려동물 */
export const ROUTE_USER_PET = `/user/pet`; 

/** 마이페이지(보호자) - 계정정보 */
export const ROUTE_USER_INFO = `/user/info`; 
export const ROUTE_USER_INFO_UPDATE = `${ROUTE_USER_INFO}/update/:id`; 


/** 마이페이지(수의사) - My답변내역 */
export const ROUTE_VET_ANSWER = `/vet/answer`; 

/** 마이페이지(수의사) - My실시간상담내역 */
export const ROUTE_VET_CONSULT = `/vet/consult`; 

/** 마이페이지(수의사) - 계정정보 */
export const ROUTE_VET_INFO = `/vet/info`; 

/** 시스템관리 **/
export const ROUTE_SYSTEM =`/system/:id`;
export const ROUTE_SYSTEM_WITH_ID =(id: string) => `/system/${id}`;

/** 시스템관리 - 권한관리 */
export const ROUTE_AUTHOR = `/system/author`; 

/** 시스템관리 - 코드관리 */
export const ROUTE_CODE = `/system/code`; 

/** 시스템관리 - 사용로그 */
export const ROUTE_LOG = `/system/log`; 