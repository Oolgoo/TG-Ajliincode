export interface dateSearchType {
    searchDate: string;
    initialValue: string;
    searchList: any[];
}

export const searchTypeData: dateSearchType[] = [
    {
        searchDate: 'registDate',
        initialValue: 'REGDT',
        searchList: [
            {
                value: 'REGDT',
                label: '등록일자',
            }
        ]
    },
    {
        searchDate: 'dmndDate',
        initialValue: 'REGDT',
        searchList: [
            {
                value: 'REGDT',
                label: '요청일자',
            }
        ]
    },
    {
        searchDate: 'crynDate',
        initialValue: 'CRYNDT',
        searchList: [
            {
                value: 'CRYNDT',
                label: '반입일자',
            }
        ]
    },
    {
        searchDate: 'writeDate',
        initialValue: 'REGDT',
        searchList: [
            {
                value: 'REGDT',
                label: '작성일자',
            },
        ]
    },
    {
        searchDate: 'default',
        initialValue: 'PROJBGNGDT',
        searchList:
            [{
                value: 'PROJBGNGDT',
                label: '시작일자',
            },
            {
                value: 'PROJENDDT',
                label: '종료일자',
            }]
    },
    {
        searchDate: 'loginDate',
        initialValue: 'LOGINDT',
        searchList: [
            {
                value: 'LOGINDT',
                label: '로그인일자',
            },
        ]
    },
    {
        searchDate: 'joinDate',
        initialValue: 'REGDT',
        searchList: [
            {
                value: 'REGDT',
                label: '가입일자',
            },
        ]
    },
    {
        searchDate: 'projDate',
        initialValue: 'PROJBGNGDT',
        searchList:
            [{
                value: 'PROJBGNGDT',
                label: '시작일자',
            },
            {
                value: 'PROJENDDT',
                label: '종료일자',
            }]
    },
]