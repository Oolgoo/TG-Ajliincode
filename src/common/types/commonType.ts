
export interface CodeResponse {
    code: number;
    codeStr: string;
    status: string;
}

export interface FilterParams{
    pageNo?: number;                
    itemsPerPage?: number;          
    searchType?:string;            
    searchValue?:string;            
    dateType?:string;               
    startDt?:string;               
    endDt?:string;                  
    projSttsCd?: string;            
    itemTypCd?: string;              
}

export interface FileResponse {
    fileNo: number;
    fileNm: string;
    extNm: string;
    fileId: string;
    fileSize: number;
    mimeType: string;
    srcPath: string;
    delYn: string;
    fileMpgNo: number;
    regDt: string;
}

export interface FileParams {
    fileNo: number;
}