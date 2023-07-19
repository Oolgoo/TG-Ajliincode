import { atom } from "recoil";

// step 상태
export const petStepAtom = atom<string>({
    key: 'petStepAtom',
    default: undefined
});

// modal 상태
export const petModalAtom = atom<boolean>({
    key: 'petModalAtom',
    default: undefined
});