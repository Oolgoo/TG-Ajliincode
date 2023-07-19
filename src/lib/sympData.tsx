export const getSympNm = (symptType?: string) => {
    let symptNm = '';

    if (symptType) {
        switch (symptType) {
            case '01':
                symptNm = '행동장애'
                break;
            case '02':
                symptNm = '소화'
                break;
            case '03':
                symptNm = '예방접종'
                break;
            case '04':
                symptNm = '안구'
                break;
            case '05':
                symptNm = '공통'
                break;
            case '06':
                symptNm = '기생충'
                break;
            case '02':
                symptNm = '다이어트'
                break;
            default:
                symptNm = '기타'
                break;
        }
    }
    return symptNm;
}