export const getAllFileSize = (value: any) => {
    //전체 파일 계산
    
    if (value&&value?.length!==0) {
        const sizeCal = value.map((data: { size: number }) => data.size).reduce((acc: number, curr: number) => acc + curr);
        return sizeCal;
    } else {
        return 0;
    }
}

export const checkFullSize = (value: any) => {
    if (value) {
        const fileSize = getAllFileSize(value);
        if(fileSize >10485760){
            return false;
        }else{
            return  true;
        }
    } else {
        return true;
    }
}