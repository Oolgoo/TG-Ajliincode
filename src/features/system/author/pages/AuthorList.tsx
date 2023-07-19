import { Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { MainContentHeader, PaginationTable, SearchBar, usePagination } from 'common';
import React, { useState } from 'react';

export const AuthorList = () => {

    //전체 리스트 데이터 수
    const [totalElement,  ] = useState<number>(0);

    const { pagination, onChangePageSize,   } = usePagination({
        totalElement,
        onChangePagination: () => {
            /* const _queries = {
                pageNo: page,
                itemsPerPage: pageSize
            }; */
        }
    });
    
    const columns: ColumnProps<any>[] = [
        {
            title: '권한명',
            dataIndex: 'authrtNm',
            align: 'center',
            width: '30%',
        },
        {
            title: '권한설명',
            dataIndex: 'authrtExpln',
            align: 'center',
            width: '30%',
        },
        {
            title: '상세보기',
            dataIndex: 'regDt',
            key: 'regDt',
            align: 'center',
            width: '15%',
            render: () => {
                return (
                    <>
                        <Button>
                            상세보기
                        </Button>
                    </>
                )
            }
        },
        {
            title: '메뉴설정',
            dataIndex: 'mbrNm',
            key: 'mbrNm',
            align: 'center',
            width: '15%',
            render: () => {
                return (
                    <>
                        <Button>
                            메뉴설정
                        </Button>
                    </>
                )
            }
        }
    ]

    return (
        <>
        <MainContentHeader title={`권한관리`} content={'content'} />

        <SearchBar
                searchDateType="loginDate"
                onReset={() => {
                    //setLogParam({ pageNo: 1, itemsPerPage: 10 });
                }}
                onSearch={() => {
                    console.log('1');
                }}
                searchTypes={[]}
            />
        <PaginationTable
            showRowSelection={false}
            noAsync={false}
            columns={columns}
            pagination={pagination}
            onChangePageSize={onChangePageSize}
            dataSource={[]}
        />
    </>
    );
};