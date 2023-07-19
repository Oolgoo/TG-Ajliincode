import React, { useEffect, useState } from 'react';
import { MainContentHeader, PageLoader, PetTagItem, userDataAtom } from 'common';
import { Button, Divider, Space, Image, Popconfirm } from 'antd';
import { LikeOutlined, SmileOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_ASK, ROUTE_ASK_UPDATE_WITH_ID } from 'routes/const';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteAskFn, getAskDetailFn } from '../apis';
import { AskAnsDetail, MoreAskDetail, MoreAnswerDatail, MoreAskCreate, MoreAnsCreate } from '../components';
import { AnsCreate } from '../components/AnsCreate';
import { addMoreAnsStateAtom, ansAddStateAtom } from '../recoils/ansRecoil';
import { addMoreAskStateAtom } from '../recoils';
import readyImg from 'assets/img/imgReady.jpg';

const AskDetail = () => {

    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    const navigate = useNavigate();

    const content = `반려동물에 대해 모든 걸 물어보세요! ANIWIDE의 수의사 분들께서 답변해 주실 거에요!`;

    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    const queryClient = useQueryClient();
    const { id: qustnNo } = useParams<{ id: string }>();

    //삭제 컨펌
    const [openConfirm, setOpenConfirm] = useState(false);

    //답변 등록 상태
    const [addAns, setAddAns] = useRecoilState(ansAddStateAtom);

    //추가 질문 등록 상태
    const [addMoreAsk, setAddMoreAsk] = useRecoilState(addMoreAskStateAtom);

    //추가 답변 등록 상태
    const [addMoreAns, setAddMoreAns] = useRecoilState(addMoreAnsStateAtom);

    // React Query 상세 조회
    const { isLoading, isError, data, error } = useQuery([
        'getAskDetail', qustnNo], () => getAskDetailFn(qustnNo), {
        retry: 1
    });

    const updateClick = () => {
        navigate(ROUTE_ASK_UPDATE_WITH_ID(Number(qustnNo)))
    }

    const deleteConfirm = async () => {
        mutate(Number(qustnNo));
    };

    const deleteCancel = () => {
        setOpenConfirm(false);
    };

    //질문 삭제
    const { mutate } = useMutation((qustnNo: number) => deleteAskFn({ 'qustnNo': qustnNo }), {
        onSuccess: () => {
            // 삭제 완료 후 목록 재 조회
            queryClient.invalidateQueries({ queryKey: ['getAskAll', 'getAskRec'] });
            navigate(ROUTE_ASK);
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

    //목록으로 돌아가기
    const goList = () => {
        //상태 초기화
        setAddAns(false);
        setAddMoreAsk(false);
        //목록 navigation 뒤로가기
        navigate(-1);
    }

    return (
        <>
            <MainContentHeader title={`묻고 답하기`} content={content} />

            <div
                style={{
                    borderBottom: '1px solid #666',
                    margin: '15px 0 10px 0',
                }}
            ></div>

            <div
                style={{
                    border: '1px solid #e0dccc',
                    borderRadius: 5,
                    marginBottom: 20,
                    padding: 10,
                }}
            >
                <div
                    style={{
                        marginBottom: 5,
                        padding: 10,
                        borderBottom: '1px solid #eeece4',
                    }}
                >
                    <span
                        style={{
                            fontWeight: 600,
                        }}
                    >
                        {data?.detail.qustnTtl}
                    </span>
                    <span
                        style={{
                            float: 'right',
                            color: '#aaa',
                        }}
                    >
                        {data?.detail.regDt}
                    </span>
                </div>

                <div
                    style={{
                        minHeight: 150,
                        marginBottom: 5,
                        padding: 10,
                    }}
                >
                    {data?.detail.sympDtlCn}
                </div>

                <div
                    style={{
                        minHeight: 60,
                        marginBottom: 5,
                        padding: 5,
                    }}
                >
                    <Space>
                        {
                            data?.detail?.sympFileList?.map((item: any) => {
                                return (
                                    <Image
                                        width={100}
                                        height={60}
                                        src={item?.fullSrcPath}
                                    />
                                )
                            })
                        }
                    </Space>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #eeece4',
                        borderTop: '1px solid #eeece4',
                    }}
                >
                    <div
                        style={{
                            width: '10%',
                            padding: '10px',
                        }}
                    >
                        <Image
                            style={{
                                borderRadius: 10,
                            }}
                            preview={false}
                            width={70}
                            height={50}
                            src={
                                (data?.petData?.fileList && data?.petData?.fileList[0])
                                    ? data?.petData?.fileList[0].fullSrcPath
                                    : readyImg}
                        />
                    </div>
                    <div
                        style={{
                            width: '80%',
                        }}
                    >
                        <div
                            style={{
                                padding: '10px',
                                fontSize: '13px',
                                color: '#595960',
                            }}
                        >
                            {data?.petData.petNm}
                        </div>
                        <div
                            style={{
                                padding: '5px',
                            }}
                        >
                            <Space
                                key="action"
                                size={[0, 8]}
                                wrap
                            >
                                <PetTagItem
                                    bred={data?.petData?.bred}
                                    gndrCd={data?.petData?.gndrCd}
                                    neutYn={data?.petData?.neutYn}
                                    age={data?.petData?.age}
                                    wght={data?.petData?.wght}
                                />
                            </Space>
                        </div>
                    </div>
                    {
                        data?.detail.regId === userData?.id && (
                            <div
                                style={{
                                    width: '10%',
                                    display: 'flex',
                                    justifyContent: 'right',
                                    alignItems: 'end',
                                    paddingBottom: 10
                                }}>
                                <span
                                    onClick={() => updateClick()}
                                    style={{
                                        marginRight: 10,
                                        cursor: 'pointer',
                                        color: '#ffdb4d'
                                    }}><FormOutlined /></span>
                                <Popconfirm
                                    title="정말 삭제하시겠습니까?"
                                    description="삭제 시 복구할 수 없습니다."
                                    open={openConfirm}
                                    onConfirm={deleteConfirm}
                                    onCancel={deleteCancel}
                                >
                                    <span
                                        onClick={() => setOpenConfirm(true)}
                                        style={{
                                            marginRight: 10,
                                            cursor: 'pointer',
                                            color: '#d84242'
                                        }}><DeleteOutlined /></span>
                                </Popconfirm>
                            </div>
                        )}
                </div>
                <div
                    style={{
                        padding: '10px 0 0',
                        textAlign: 'center',
                    }}
                >
                    <Space>
                        <Button
                            type="text"
                            style={{
                                color: 'black',
                                border: '1px solid #aaa',
                                borderRadius: 5,
                                height: 40,
                            }}
                            icon={<LikeOutlined />}
                        >
                            도움이 돼요!
                        </Button>
                        &nbsp;
                        <IconText
                            icon={SmileOutlined}
                            text={data?.detail.likeCnt + "명이 이 질문에 도움을 받았습니다."}
                            key="list-vertical-message"
                        />
                    </Space>
                </div>
            </div>
            {
                /* 수의사 답변 */
                (data?.ansDetail && !addAns) ? (
                    <AskAnsDetail
                        ansData={data?.ansDetail}
                    />
                ) : (userData?.role === 'ROLE_VET' && !addAns) ? (
                    <>
                        <Button
                            type="primary"
                            style={{
                                float: 'right',
                                borderRadius: 5,
                                color: 'black',
                            }}
                            onClick={() => {
                                setAddAns(true);
                            }}
                        >
                            답변하기
                        </Button>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '2rem',
                                marginBottom: '2rem'
                            }}
                        >
                            답변이 없습니다.
                        </div>
                    </>
                ) : !addAns ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '2rem',
                                marginBottom: '2rem'
                            }}
                        >
                            답변이 없습니다.
                        </div>
                    </>
                ) : (<></>)
            }
            {
                addAns && (
                    <AnsCreate
                        ansData={data?.ansDetail ? data?.ansDetail : undefined}
                        ansState={(yn: boolean) => setAddAns(yn)}
                        qustnNo={Number(qustnNo)}
                    />
                )
            }
            <Divider />
            {
                (data?.detail.regId === userData?.id) && data?.ansDetail !== undefined
                && !addMoreAsk && !data?.moreAskDetail && (
                    <div
                        style={{
                            borderBottom: '1px solid #e0dccc',
                            margin: '15px 0 10px 0',
                            width: '100%',
                            paddingBottom: 40,
                        }}
                    >
                        <Button
                            type="primary"
                            style={{
                                float: 'right',
                                borderRadius: 5,
                                //fontWeight: 600,
                                color: 'black',
                            }}
                            onClick={() => {
                                setAddMoreAsk(true)
                            }}
                        >
                            추가 질문하기
                        </Button>
                    </div>
                )}
            {
                /* 추가질문 */
                (!addMoreAsk && data?.moreAskDetail) && (
                    <MoreAskDetail
                        moreAskData={data?.moreAskDetail}
                    />)
            }
            {
                addMoreAsk && (
                    <MoreAskCreate
                        moreAskData={data?.moreAskDetail ? data?.moreAskDetail : undefined}
                        moreAskState={(yn: boolean) => setAddMoreAsk(yn)}
                        qustnNo={Number(qustnNo)}
                    />
                )
            }
            {
                (data?.moreAskDetail && !data?.moreAnsDetail && userData?.role === 'ROLE_VET' && !addMoreAns)
                && (
                    <div
                        style={{
                            borderBottom: '1px solid #e0dccc',
                            margin: '15px 0 10px 0',
                            width: '100%',
                            paddingBottom: 40,
                        }}
                    >
                        <Button
                            type="primary"
                            style={{
                                float: 'right',
                                borderRadius: 5,
                                //fontWeight: 600,
                                color: 'black',
                            }}
                            onClick={() => {
                                setAddMoreAns(true)
                            }}
                        >
                            답변하기
                        </Button>
                    </div>
                )
            }
            {
                /* 추가답변 */
                (!addMoreAns && data?.moreAnsDetail) && (
                    <>
                        <Divider />
                        <MoreAnswerDatail
                            moreAnsData={data?.moreAnsDetail}
                        />
                    </>
                )
            }
            {
                addMoreAns && (
                    <>
                        <MoreAnsCreate
                            addQustnNo={data?.moreAskDetail.addQustnNo}
                            moreAnsData={data?.moreAnsDetail ? data?.moreAnsDetail : undefined}
                            moreAnsState={(yn: boolean) => setAddMoreAns(yn)}
                        />
                    </>
                )
            }
            <div style={{ float: 'right', marginTop: 10 }}>
                <Button
                    onClick={() =>
                        goList()
                    }>
                    목록
                </Button>
            </div>
        </>
    );
};

export default AskDetail;