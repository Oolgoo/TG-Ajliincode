import dog01 from 'assets/img/dogs/dog01.jpg';
import dog02 from 'assets/img/dogs/dog02.jpg';
import dog03 from 'assets/img/dogs/dog03.jpg';

export const data = [
    {
        key:1,
        petName: `한톨`,
        userTitle: `우리집 한톨이가 사료를 잘 먹지 않아요`,
        userAvatar: dog01,
        userDescription: `접수일 : 2023-04-25 14:30`,
        userContent: `우리집 한톨이가 사료를 잘 먹지 않아요. 어쩌면 좋을까요?`,
        vetTitle: `돌담병원 부용주 수의사`,
        vetAvatar: `https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_5%2F1682295752057wlsBN_JPEG%2Fb4f76b9287f69eb38c228e3a946fbb75.jpg`,
        vetDescription: `상담예약일 : 2023-04-25 14:30`,
        vetType: [`치과`, `영상진단`],
        status: `Y`,
        tagData: ['강아지','믹스','여','2살','중성화O',],
        petSymptom: `소화`
    },
    {
        key:2,
        petName: `두톨`,
        userTitle: `우리집 한톨이 동생 두톨이도 사료를 잘 먹지 않아요`,
        userAvatar: dog02,
        userDescription: `접수일 : 2023-04-22 10:30`,
        userContent:
            `한톨이 동생 두톨이도 사료를 잘 안먹어요. 얘네 왜이래요?`,
        vetTitle: `돌담병원 서우진 수의사`,
        vetAvatar: `https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_62%2F1682295858504Hwp2T_JPEG%2F5cc986971a347ebebfaa85dc8a1a5f6b.jpg`,
        vetDescription: `상담예약일 : 2023-04-25 14:30`,
        vetType: [`내과`, `임상병리`,`마취통증`],
        status: `N`,
        tagData: ['강아지','믹스','남','1살','중성화O'],
        petSymptom: `소화`
    },
    {
        key:3,
        petName: `세톨`,
        userTitle: `어딘가 아픈거 같은데 이유를 모르겠어요`,
        userAvatar: dog03,
        userDescription: `접수일 : 2023-04-20 12:30`,
        userContent:
            `어제부터 계속 켁켁대는데 밥도 잘 먹고 잘 놀아요. 근데 계속 켁켁대요`,
        vetTitle: `돌담병원 차은재 수의사`,
        vetAvatar: `https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_237%2F16822959396966gTqu_JPEG%2F820aac34df2aaf61edec5f84f66a206a.jpg`,
        vetDescription: `상담예약일 : 2023-04-25 14:30`,
        vetType: [`가정의학과`,`건강관리`],
        status: `H`,
        tagData: ['강아지','시바견','남','3살','중성화X'],
        petSymptom: `기타`
    }
];