import React from "react";

import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_NOTICE_CREATE, ROUTE_NOTICE_DETAIL_WITH_ID } from 'routes/const';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { noticeFilter } from '../recoils';
import { getAllNoticesFn } from '../apis';
import { AdminColumns } from '../components';
import { MainContentHeader, PageLoader, PaginationTable, SearchBar, usePagination, userDataAtom } from "common";

const NoticeList = () => {
    const [userData,] = useRecoilState(userDataAtom);
    const navigate = useNavigate();
    
    // 검색 필터 atom
    const [filter, setFilter] = useRecoilState(noticeFilter);

    // React Query 목록 조회
    const { isLoading, isError, data, error, refetch } = useQuery([
        'getAllNotices', filter], () => getAllNoticesFn(filter), {
        retry: 0
    });

    // 검색조회
    const handleSearch = (values: { [key: string]: any }) => {
        const { dateRange, key, word, dateType } = values;

        setFilter({
            ...filter,
            pageNo: 1,
            itemsPerPage: 10,
            dateType: dateType ?? undefined,
            startDt: dateRange ? dateRange[0] : undefined,
            endDt: dateRange ? dateRange[1] : undefined,
            searchType: key,
            searchValue: word
        })
    }

    // 페이지당 갯수
    const { pagination, onChangePageSize } = usePagination({
        totalElement: data?.value.totalCount ?? 0,
        // totalElement:  0,
        onChangePagination: (page, pageSize) => {
            setFilter({
                ...filter,
                pageNo: page,
                itemsPerPage: pageSize
            });
        }
    });

    // 에러
    useEffect(() => {
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    message.error(el.message)
                );
            } else {
                message.error((error as any).response.data.message)
            }
        }
    }, [isLoading]);

    // 초기화 시 refetch
    useEffect(() => {
        refetch();
    },[filter]);

    const handleReset = () => {
        setFilter({
            pageNo: 1,
            itemsPerPage: 10
        });
    };

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <MainContentHeader 
                title={`공지사항`}
                content={`공지사항에 대해 블라블라。`}
            />
            
            <SearchBar
                searchDateType="writeDate"
                onReset={handleReset}
                onSearch={handleSearch}
                searchTypes={[
                {
                    key: 'NTCNM',
                    name: '제목'
                }, {
                    key: 'MBRNM',
                    name: '작성자'
                }
                ]}
            />
            
            <PaginationTable
                style={{ cursor: 'pointer' }}
                showRowSelection={false}
                noAsync={false}
                columns={AdminColumns}
                dataSource={data?.value.pages ?? []}
                pagination={pagination}
                onChangePageSize={onChangePageSize}
                onRow={(record) => {
                    return {
                        onClick: () => navigate(ROUTE_NOTICE_DETAIL_WITH_ID(record?.ntcNo))
                    }
                }}
                customLeft={
                    <Button>
                        엑셀 다운로드
                    </Button>
                }
                customRight={
                    userData?.role == 'ROLE_ADMIN' &&
                    <Button
                        className='button'
                        type='primary'
                        onClick={() =>
                            navigate(ROUTE_NOTICE_CREATE)
                        }
                    >
                        공지사항 등록
                    </Button>
                }
            />
        </>
    )
};

export default NoticeList;