import { atom } from "recoil";
import { PetInfo } from "../types";

//새로운 동물 추가 여부
export const petNewYn = atom<boolean>({
    key: 'petNewYn',
    default: false
})

//선택 동물 데이터
export const petSelectDataAtom = atom<PetInfo|undefined>({
    key: 'petSelectDataAtom',
    default: undefined
})

//선택 증상
export const petSelectSymptAtom = atom<string|undefined>({
    key: 'petSelectSymptAtom',
    default: undefined
})


