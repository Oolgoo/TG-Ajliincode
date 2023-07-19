import { atom } from "recoil";

export const ansAddStateAtom = atom<boolean>({
    key: 'ansAddStateAtom',
    default: false
});

export const addMoreAnsStateAtom = atom<boolean>({
    key: 'addMoreAnsStateAtom',
    default: false
})