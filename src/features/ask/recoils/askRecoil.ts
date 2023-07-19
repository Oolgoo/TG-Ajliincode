import { FilterParams } from "common";
import { atom } from "recoil"

// step 상태
export const askStepAtom = atom<string>({
    key: 'askStepAtom',
    default: undefined
});

// Modal 상태
export const askModalAtom = atom<boolean>({
    key: 'askModalAtom',
    default: undefined
});

//등록시 제목값
export const askModalTtlAtom = atom<string | undefined>({
    key: 'askModalTtlAtom',
    default: undefined
});
//등록시 내용
export const askModalCnAtom = atom<string | undefined>({
    key: 'askModalCnAtom',
    default: undefined
});

//추가질문 상태
export const addMoreAskStateAtom = atom({
    key: 'addMoreAskStateAtom',
    default: false
})

// 검색필터
export const askAllFilter = atom({
    key: 'askAllFilter',
    default: [] as FilterParams
});