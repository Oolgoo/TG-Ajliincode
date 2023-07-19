import React from "react";

import { Button, Checkbox, Col, Descriptions, Form, Popconfirm, Radio, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { deleteNoticeFn, getNoticeFn } from "../apis";
import { ROUTE_NOTICE, ROUTE_NOTICE_UPDATE_WITH_ID } from "routes/const";
import { MainContentHeader, PageLoader, userDataAtom } from "common";
import { useRecoilState } from "recoil";

const NoticeDetail = () => {
    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id: ntcNo } = useParams<{ id: string }>();

    const [openConfirm, setOpenConfirm] = useState(false);

    // React Query 상세 조회
    const { isLoading, isError, data, error } = useQuery([
        'getNotice', ntcNo], () => getNoticeFn(ntcNo), {
        retry: 1
    });

    const updateClick = () => {
        navigate(ROUTE_NOTICE_UPDATE_WITH_ID(Number(ntcNo)))
    }

    const deleteConfirm = async () => {
        mutate(Number(ntcNo));
    };

    const deleteCancel = () => {
        setOpenConfirm(false);
    };

    const { mutate } = useMutation((ntcNo: number) => deleteNoticeFn({ 'ntcNo': ntcNo }), {
        onSuccess: () => {
            // 삭제 완료 후 목록 재 조회
            queryClient.invalidateQueries({ queryKey: ['getAllNotices'] });
            navigate(ROUTE_NOTICE);
        },
        onError: (error: any) => {
            if (Array.isArray((error as any).response.data.error)) {
                (error as any).response.data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).response.data.message, {
                    position: 'top-right',
                });
            }
        }
    });

    // 에러
    useEffect(() => {
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                });
            }
        }
    }, [isLoading]);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <MainContentHeader
                title={`공지사항`}
                content={`공지사항에 대해 블라블라。`}
            />
            <Descriptions column={4} bordered>
                <Descriptions.Item
                    span={2}
                    label="작성자"
                    labelStyle={{
                        width: '15%',
                        fontWeight: 600,
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}
                    contentStyle={{
                        width: '35%'
                    }}>
                    <span>{data?.detail.mbrNm}</span>
                </Descriptions.Item>
                <Descriptions.Item
                    span={2}
                    label="작성일자"
                    labelStyle={{
                        width: '15%',
                        fontWeight: 600,
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}
                    contentStyle={{
                        width: '35%'
                    }}>
                    {data?.detail.regDt}
                </Descriptions.Item>
                <Descriptions.Item
                    span={2}
                    label="노출여부"
                    labelStyle={{
                        width: '15%',
                        fontWeight: 600,
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}
                    contentStyle={{
                        width: '35%'
                    }}>
                    <Radio.Group
                        disabled={true}
                        defaultValue={'Y'}
                        value={data?.detail.mainExpsrYn === 'Y' ? 'Y' : 'N'}
                    >
                        <Radio value="Y" > 노출 </Radio>
                        <Radio value="N"> 미노출 </Radio>
                    </Radio.Group>
                </Descriptions.Item>
                <Descriptions.Item
                    span={2}
                    label="메인노출기간"
                    labelStyle={{
                        width: '15%',
                        fontWeight: 600,
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}
                    contentStyle={{
                        width: '35%'
                    }}
                >
                    {data?.detail.mainExpsrYn === 'Y' ? (
                        <>
                            {data?.detail.mainExpsrBgngDt} - {data?.detail.mainExpsrEndDt}
                            <Checkbox
                                disabled={true}
                                style={{ float: "right" }}
                                checked={data?.detail.mainExpsrLmtYn === 'N' ? true : false}
                            >
                                종료일 제한 없음
                            </Checkbox>
                        </>) : (<span>메인 미노출</span>)
                    }
                </Descriptions.Item>
                <Descriptions.Item
                    span={4}
                    label="제목"
                    labelStyle={{
                        width: '15%',
                        fontWeight: 600,
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}>
                    {data?.detail.ntcTtl}
                </Descriptions.Item>
                <Descriptions.Item
                    span={4}
                    label="내용"
                    labelStyle={{
                        width: '15%',
                        fontWeight: 600,
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}
                    contentStyle={{ paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}
                >
                    <div style={{ height: '20rem', whiteSpace: 'pre-line', overflowY: 'scroll', paddingTop: 16, paddingBottom: 16 }}>
                        {data?.detail.ntcCn}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item
                    span={4}
                    label="파일목록"
                    labelStyle={{
                        width: '15%',
                        fontWeight: 600,
                        backgroundColor: '#f5f5f5',
                        textAlign: 'center'
                    }}
                >
                    {/* {
                        data?.file.length ?
                            (<>
                                <List
                                    style={{ width: '100%', fontSize: '0.8rem' }}
                                    dataSource={data?.file}
                                    renderItem={(item: FileResponse) => (
                                        <a
                                            style={{ textDecoration: 'none' }}
                                            href={`${process.env.REACT_APP_API_ROOT}/common/down?fileNo=${item?.fileNo}`}>
                                            <List.Item
                                                key={item.fileNo}
                                                style={{ cursor: 'pointer', border: 'solid 1px #e9e9e9', marginBottom: 3 }}
                                            >
                                                <StyledMeta
                                                    title={<><FileOutlined /><span style={{ fontSize: '0.85rem', marginLeft: 10 }}>{item?.fileNm}</span></>}
                                                />
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        {
                                                            fileSizeMB(item.fileSize)
                                                        }
                                                    </span>
                                                    <VerticalAlignBottomOutlined />
                                                </div>
                                            </List.Item>
                                        </a>
                                    )}
                                />
                            </>) : (<p style={{ marginTop: '0.5rem' }}>파일없음</p>)
                    } */}
                </Descriptions.Item>
            </Descriptions>
            <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Form.Item style={{ float: 'right' }}>
                        {
                            userData?.role == 'ROLE_ADMIN' &&
                            (<>
                                <Button
                                    type="primary"
                                    size='middle'
                                    style={{
                                        width: 60,
                                        marginRight: 5,
                                    }}
                                    onClick={updateClick}
                                >
                                    수정
                                </Button>
                                <Popconfirm
                                    title="정말 삭제하시겠습니까?"
                                    description="삭제 시 복구할 수 없습니다."
                                    open={openConfirm}
                                    onConfirm={deleteConfirm}
                                    onCancel={deleteCancel}
                                >
                                    <Button danger
                                        type="primary"
                                        size='middle'
                                        style={{
                                            width: 60,
                                            marginRight: 5,
                                        }}
                                        onClick={() => setOpenConfirm(true)}
                                    >
                                        삭제
                                    </Button>
                                </Popconfirm>
                            </>)
                        }
                        <Button
                            size='middle'
                            style={{
                                width: 60,
                            }}
                            onClick={() => {
                                navigate(ROUTE_NOTICE)
                            }}
                        >
                            목록
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default NoticeDetail;