import { atom } from "recoil";

// step 상태
export const joinStepAtom = atom<string>({
    key: 'joinStepAtom',
    default: undefined
})
