import React from "react"

import { PaperClipOutlined } from "@ant-design/icons"
import { ColumnProps } from "antd/es/table"

//컬럼 정보
export const AdminColumns: ColumnProps<any>[] = [
    {
        title: '제목',
        dataIndex: 'ntcNm',
        key: 'title',
        align: 'center',
        width: '40%',
        render: (value, record) => {
            return (
                <>
                    {value !== '' ? (
                        <div style={{ textAlign: 'left' }
                        }>
                            <span>{value} </span>
                            {
                                record.fileCnt > 0 ?
                                    (<PaperClipOutlined style={{ marginLeft: 5, color: '#000000ae', fontSize: 12 }} />) : (<></ >)
                            }
                        </div>
                    ) : (<>
                        <span></span>
                        {
                            record.fileCnt > 0 ?
                                (<PaperClipOutlined />) : (<></ >)
                        }
                    </>
                    )}
                </>
            )
        },
    },
    {
        title: '노출여부',
        dataIndex: 'mainExpsrYn',
        key: 'mainExpsrYn',
        align: 'center',
        width: '10%',
        render: data => {
            return (
                <>
                    {data === 'Y' ?
                        (<span>노출 </span>) : (<span>미 노출</span >)
                    }
                </>
            )
        }
    },
    {
        title: '메인노출기간',
        dataIndex: 'mainExpsrYn',
        align: 'center',
        width: '20%',
        render: (value, record) => {
            return (
                <>
                    {
                        value === 'Y' ?
                            (
                                <span>{record.mainExpsrBgngDt.substr(0, 10)} ~{record.mainExpsrEndDt && record.mainExpsrEndDt.substr(0, 10)} </span>
                            ) : (<></>)
                    }
                </>
            )
        }
    },
    {
        title: '작성자',
        dataIndex: 'mbrNm',
        key: 'mbrNm',
        align: 'center',
        width: '10%'
    },
    {
        title: '작성일',
        dataIndex: 'regDt',
        key: 'regDt',
        align: 'center',
        width: '10%',
        render: data => {
            return (
                <>
                    {
                        data ?
                            (<span> {data.substr(0, 10)} </span>)
                            : (<></>)
                    }
                </>
            )
        }
    }
]

export const UserColumns: ColumnProps<any>[] = [
    {
        title: '제목',
        dataIndex: 'ntcTtl',
        key: 'title',
        align: 'center',
        width: '60%',
        render: (value, record) => {
            return (
                <>
                    {value !== '' ? (
                        <div style={{ textAlign: 'left' }
                        }>
                            <span>{value} </span>
                            {
                                record.fileCnt > 0 ?
                                    (<PaperClipOutlined style={{ marginLeft: 5, color: '#000000ae', fontSize: 12 }} />) : (<></ >)
                            }
                        </div>
                    ) : (<>
                        <span></span>
                        {
                            record.fileCnt > 0 ?
                                (<PaperClipOutlined />) : (<></ >)
                        }
                    </>
                    )}
                </>
            )
        },
    },
    {
        title: '작성자',
        dataIndex: 'mbrNm',
        key: 'mbrNm',
        align: 'center',
        width: '15%'
    },
    {
        title: '작성일',
        dataIndex: 'regDt',
        key: 'regDt',
        align: 'center',
        width: '15%',
        render: data => {
            return (
                <>
                    {
                        data ?
                            (<span> {data.substr(0, 10)} </span>)
                            : (<></>)
                    }
                </>
            )
        }
    }
]