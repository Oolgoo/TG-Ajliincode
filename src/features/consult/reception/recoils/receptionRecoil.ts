import { atom } from "recoil";


// step 상태
export const receptionStepAtom = atom<string>({
    key: 'receptionStepAtom',
    default: undefined
})

// modal 상태
export const receptionModalAtom = atom<boolean>({
    key: 'receptionModalAtom',
    default: undefined
})

// end 상태
export const consultEndYn = atom<boolean>({
    key: 'consultEndYn',
    default: false
})

// 진료 경험 여부 상태
export const haveConsultYnAtom = atom<boolean>({
    key: 'haveConsultYnAtom',
    default: false
})