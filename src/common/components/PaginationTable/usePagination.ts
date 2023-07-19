import { useMemo, useCallback, useRef, useState, useEffect } from 'react';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const IMAGE_MAX_SIZE_300KB = 300000;

export interface usePaginationProps {
  queries?: { skip?: number; limit?: number };
  totalElement: number;
  defaultPage?: number;
  defaultPageSize?: number;
  onChangePagination?: (page: number, size: number) => void;
}

export const usePagination = ({
  queries,
  totalElement,
  onChangePagination,
  defaultPage = DEFAULT_PAGE,
  defaultPageSize = DEFAULT_PAGE_SIZE
}: usePaginationProps) => {
  const [pager, setPager] = useState({
    page: defaultPage,
    pageSize: defaultPageSize
  });

  const changePaginationRef = useRef<Function>();

  changePaginationRef.current = onChangePagination;

  const setPagination = useCallback((page?: number, pageSize?: number) => {
    setPager(pager => Object.assign({}, pager, { page, pageSize }));
  }, []);

  const pagination = useMemo(() => {
    return {
      total: totalElement,
      current: pager.page,
      pageSize: pager.pageSize,
      showSizeChanger: false,
      onChange: (page: number, pageSize: number = pager.pageSize) => {
        if (changePaginationRef.current) {
          changePaginationRef.current(page, pageSize);
        }

        setPagination(page, pageSize);
      }
    };
  }, [totalElement, pager, setPagination]);

  const onChangePageSize = useCallback(
    (page: number, pageSize: number = pager.pageSize) => {
      if (changePaginationRef.current) {
        changePaginationRef.current(page, pageSize);
      }

      setPagination(page, pageSize);
    },
    [pager.pageSize, setPagination]
  );

  useEffect(() => {
    if (!queries) {
      return;
    }

    const { skip = 1, limit = 10 } = queries;

    setPagination(skip, limit);
  }, [queries, setPagination]);

  return {
    page: pager.page,
    pageSize: pager.pageSize,
    pagination,
    onChangePageSize,
    setPagination
  };
};
