import { atom } from "recoil";
import { FilterParams } from "common";

// 검색필터
export const noticeFilter = atom({
    key: 'noticeFilter',
    default: [] as FilterParams
});