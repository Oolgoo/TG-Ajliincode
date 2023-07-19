import { atom } from "recoil";

// step 상태
export const findStateAtom = atom<string>({
    key: 'findStateAtom',
    default: undefined
})
