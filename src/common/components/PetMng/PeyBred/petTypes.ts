export const dogTypes = [
    { value: '1', label: '푸들' },
    { value: '2', label: '골든리트리버' },
    { value: '3', label: '닥스훈트' },
    { value: '4', label: '비글' },
    { value: '5', label: '시츄' },
    { value: '6', label: '몰티즈' },
    { value: '7', label: '웰시코기' },
    { value: '8', label: '보더콜리' },
    { value: '0', label: '기타' }
]

export const catTypes = [
    { value: '1', label: '코리안 숏헤어' },
    { value: '2', label: '브리티시 숏헤어' },
    { value: '3', label: '페르시안' },
    { value: '4', label: '렉돌' },
    { value: '5', label: '러시안블루' },
    { value: '6', label: '스코티시 폴드' },
    { value: '7', label: '노르웨이 숲' },
    { value: '8', label: '스핑크스' },
    { value: '0', label: '기타' }
]

export const birdTypes = [
    { value: '1', label: '카나리아' },
    { value: '2', label: '잉꼬' },
    { value: '3', label: '앵무' },
    { value: '4', label: '핀치' },
    { value: '0', label: '기타' }
]

export const getPetTypeNm = (typeCd: string, bredCd: string) => {
    let data;

    if (typeCd === '1') {
        data = dogTypes.find((item) => {
            return item.value === bredCd
        })
    } else if (typeCd === '2') {
        data = catTypes.find((item) => {
            return item.value === bredCd
        })
    } else {
        data = birdTypes.find((item) => {
            return item.value === bredCd
        })
    }

    return data?.label;
}