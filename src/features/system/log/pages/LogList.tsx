import { Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { MainContentHeader, PaginationTable, SearchBar } from 'common';
import React from 'react';

const columns: ColumnProps<any>[] = [
    {
        title: 'ID',
        dataIndex: 'mbrId',
        key: 'mbrId',
        align: 'center',
        width: '12%',
    },
    {
        title: '이름',
        dataIndex: 'mbrNm',
        key: 'mbrNm',
        align: 'center',
        width: '13%',
    },
    {
        title: '부서명',
        dataIndex: 'instNm',
        key: 'instNm',
        align: 'center',
        width: '15%',
    },
    {
        title: '접속IP',
        dataIndex: 'loginIp',
        key: 'loginIp',
        align: 'center',
        width: '15%',
    },
    {
        title: '로그인 일시',
        dataIndex: 'loginDt',
        key: 'loginDt',
        align: 'center',
        width: '20%',
    },
    {
        title: '로그아웃 일시',
        dataIndex: 'logoutDt',
        key: 'logoutDt',
        align: 'center',
        width: '20%',
    },
];

export const LogList = () => {
    return (
        <>
            <MainContentHeader title={`로그관리`} content={'content'} />

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
                dataSource={[]}
                //pagination={pagination}
                //onChangePageSize={onChangePageSize}
                customLeft={
                    <Button
                        onClick={() => {
                            //excelDownload()
                        }}
                    >
                        엑셀 다운로드
                    </Button>
                }
            />
        </>
    );
};
