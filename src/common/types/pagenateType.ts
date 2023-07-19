export interface PaginateResult<T> {
    hasNext?: boolean;
    hasPrev?: boolean;
    itemsPerPage?: number;
    lastPage?: number;
    offset?: number;
    pageNo?: number;
    pages?: T[];
    totalCount?: number;
}