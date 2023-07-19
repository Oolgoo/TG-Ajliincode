import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

//localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
const { persistAtom } = recoilPersist({
    key:'setCredentials',
    storage: localStorage
});

export const setCredentials = atom<any>({
    key: 'setCredentials',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});