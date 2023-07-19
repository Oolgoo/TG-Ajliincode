import React, { useState } from 'react';
import { MainContentHeader } from 'common';
import { Avatar, Button, List, Space, Tag, Typography, Image, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ReceptionCreate from './ReceptionModalContainer';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { receptionModalAtom, receptionStepAtom } from '../recoils';
import { useNavigate } from 'react-router-dom';
import * as paths from 'routes/const';
import { data } from './Data';
import { CancleModal } from '../components';
import { userColor, vetColor } from 'enums';

const ReceptionList = () => {

    const navigate = useNavigate();

    const content = `반려동물에 대해 모든 걸 물어보세요! ANIWIDE의 수의사 분들께서 상담해 주실 거에요!`;

    const { Title } = Typography;

    const setReceptionStep = useSetRecoilState(receptionStepAtom);
    const [receptionModal, setReceptionModal] = useRecoilState(receptionModalAtom);

    const [showCancle, setShowCancle] = useState<boolean>(false);

    const handleOk = () => {
        navigate(paths.ROUTE_REALTIME);
    }

    const handleCancle = () => {
        setShowCancle(true);
    }

    return (
        <>
            <MainContentHeader title={`실시간 상담`} content={content} />

            <div
                style={{
                    borderBottom: '1px solid #666',
                    margin: '15px 0 10px 0',
                    //width: '100%',
                }}
            >
                <Title level={3} style={{ display: 'inline-block' }}>
                    실시간 상담 접수 목록
                </Title>
                <Button
                    type="primary"
                    style={{
                        float: 'right',
                        marginTop: 25,
                        borderRadius: 5,
                        color: '#23180C',
                        fontWeight: 600
                    }}
                    onClick={() => {
                        setReceptionStep('Agree');
                        setReceptionModal(true);
                    }}
                >
                    새로운 상담 접수하기
                </Button>
            </div>
            <List
                key={'aaa'}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    position: 'bottom',
                    align: 'center',
                }}
                dataSource={data}
                renderItem={(item) => (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: 'solid 1px #e9e9e9',
                                marginTop: '1rem'
                            }}
                        >
                            <div
                                style={{
                                    width: '15%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        width: 130,
                                        padding: 15,
                                    }}
                                >
                                    <Image
                                        src={item.userAvatar}
                                        style={{
                                            borderRadius: 10
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '75%' }}>
                                <div style={{ width: '55%', marginBottom: 10 }}>
                                    <List.Item
                                        key={item.userTitle}
                                        style={{
                                            padding: '10px',
                                            cursor: 'pointer'
                                        }}
                                        actions={[
                                            <Space
                                                key="action"
                                                size={[0, 8]}
                                                wrap
                                            >
                                                {item?.tagData?.map((tag: string, index: number) =>
                                                (<>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color={userColor[index]}
                                                    >
                                                        {tag}
                                                    </Tag>
                                                </>
                                                ))}
                                            </Space>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={
                                                <>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{ margin: 0, width: '100%' }}>{item.userTitle}
                                                            <span
                                                                style={{
                                                                    fontSize: 13,
                                                                    padding: '5px 15px',
                                                                    color: '#E79C0D',
                                                                    backgroundColor: '#FCF5E6',
                                                                    borderRadius: 15,
                                                                    border: 'solid 1px #FCDB95',
                                                                    width: '10%',
                                                                    marginLeft: 5
                                                                }}
                                                            >
                                                                {item.petSymptom}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            description={item.userDescription}
                                        />
                                        <div style={{
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {item.userContent}
                                        </div>
                                    </List.Item>
                                </div>
                                <Divider type="vertical" style={{ height: '50%', borderColor: '#aaa', alignSelf: 'center' }} />
                                <div style={{ width: '40%' }}>
                                    <List.Item
                                        key={item.vetTitle}
                                        style={{
                                            height: '10rem',
                                            padding: '10px',
                                            cursor: 'pointer'
                                        }}
                                        actions={[
                                            <Space key="action" size={[0, 8]} wrap
                                                style={{
                                                    marginLeft: 80
                                                }}
                                            >{
                                                    item?.vetType.map((tag: string, index: number) =>
                                                    (<>
                                                        <Tag
                                                            bordered={false}
                                                            style={{ borderRadius: '3px', color: '#8E5A00' }}
                                                            color={vetColor[index]}
                                                        >
                                                            {tag}
                                                        </Tag>
                                                    </>
                                                    ))
                                                }
                                            </Space>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} icon={<UserOutlined />} src={item.vetAvatar} />}
                                            title={item.vetTitle}
                                            description={item.vetDescription}
                                        />
                                    </List.Item>
                                </div>
                            </div>
                            <div key="statusBtn" style={{ width: '10%', padding: 10 }}>
                                {
                                    item.status === 'Y' ? (
                                        <Button
                                            type="primary"
                                            style={{
                                                height: '8rem',
                                                borderRadius: 10,
                                                color: '#23180C',
                                                float: 'right',
                                                backgroundColor: '#FBE7A2',
                                                fontWeight: 600,
                                                width: '7rem'
                                            }}
                                            onClick={() => handleOk()}
                                        >
                                            <span>수의사님<br />만나러가기</span>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                type="text"
                                                style={{
                                                    height: '5rem',
                                                    borderRadius: 10,
                                                    marginBottom: '0.5rem',
                                                    color: '#23180C',
                                                    backgroundColor: '#F7A95B',
                                                    float: 'right',
                                                    fontWeight: 600,
                                                    width: '7rem'
                                                }}
                                            >
                                                <span>상담시간이<br />아니에요!</span>
                                            </Button>
                                            <br />
                                            <Button
                                                type="primary"
                                                danger
                                                style={{
                                                    height: '2.5rem',
                                                    borderRadius: 10,
                                                    color: '#fff',
                                                    float: 'right',
                                                    fontWeight: 600,
                                                    width: '7rem',
                                                    backgroundColor: '#F67953'
                                                }}
                                                onClick={() => handleCancle()}
                                            >
                                                <span>예약취소</span>
                                            </Button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )}
            />
            {receptionModal && (
                <ReceptionCreate
                    closeModal={() => setReceptionModal(false)}
                    open={receptionModal}
                />
            )}
            {
                showCancle && (
                    <CancleModal
                        closeModal={() => setShowCancle(false)}
                        open={showCancle}
                    />
                )
            }
        </>
    );
};

export default ReceptionList;