import { Button, Card, List, Space, Tag, Image, Typography, Avatar, Divider, Modal, Input } from 'antd';
import { MainContentHeader } from 'common';
import React, { useState } from 'react';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { receptionModalAtom, receptionStepAtom } from 'features/consult/reception';
import ReceptionCreate from 'features/consult/reception/pages/ReceptionModalContainer';
import { ConsultResultDetailModal } from 'features/consult';
import { useNavigate } from 'react-router-dom';
import * as paths from 'routes/const';
import { data } from 'features/consult/reception/pages/Data';
import { vetColor } from 'enums';

const UserConsultList = () => {

    const navigate = useNavigate();

    const { Title } = Typography;

    const setReceptionStep = useSetRecoilState(receptionStepAtom);
    const [receptionModal, setReceptionModal] = useRecoilState(receptionModalAtom);
    const [openNameModal, setOpenNameModal] = useState<boolean>(false);
    const [nameState, setNameState] = useState<string | undefined>(undefined);

    const content = `반려동물에 대해 모든 걸 물어보세요! ANIWIDE의 수의사 분들께서 상담해 주실 거에요!`;

    const [showResult, setShowResult] = useState<boolean>(false);

/*     const handleCloseConsult = () => {
        navigate(-1);
    } */

    //상담시작
    const handleOk = () => {
        navigate(paths.ROUTE_REALTIME);
    }

    return (
        <>
            <MainContentHeader title={`MY 상담 내역`} content={content} />

            <div style={{ display: "flex", justifyContent: 'start', marginBottom: '1rem' }}>
                <Card style={{ width: '25%', marginRight: '2rem', borderTop: 'solid 2px #747474' }}>
                    <h2>나의 상담</h2>
                    <h3>2건</h3>
                </Card>
                <Card style={{ width: '25%', marginRight: '2rem', borderTop: 'solid 2px #747474' }}>
                    <h2>상담 완료</h2>
                    <h3>1건</h3>
                </Card>
                <Card style={{ width: '25%', borderTop: 'solid 2px #747474' }}>
                    <h2>상담 예정</h2>
                    <h3>1건</h3>
                </Card>
            </div>
            <Title level={3} style={{ display: 'inline-block' }}>나의 상담 목록</Title>
            <div style={{ borderTop: 'solid 2px #747474', paddingTop: '1rem' }}>
                <List
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
                                    marginBottom: '0.5rem',
                                    marginTop: '0.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        width: '15%',
                                        textAlign: 'center',
                                        padding: 15,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '70%',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <Image
                                            src={item.userAvatar}
                                            style={{
                                                borderRadius: 10,
                                                height: '7rem',
                                                width: '7rem'
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            borderRadius: 10,
                                            width: '7rem',
                                            backgroundColor: '#FBF0CA',
                                            color: '#23180C',
                                            fontWeight: 600,
                                            marginTop: 5,
                                            display: 'inline-block',
                                            padding: 5
                                        }}>
                                        {item.petName}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '75%' }}>
                                    <div style={{ width: '58%', marginBottom: 10, alignSelf: 'center' }}>
                                        <List.Item
                                            key={item.userTitle}
                                            style={{
                                                height: '12rem',
                                                padding: '10px',
                                                cursor: 'pointer'
                                            }}
                                            actions={[
                                                <Space
                                                    key="action"
                                                    size={[0, 8]}
                                                    wrap
                                                >
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDF5E6"
                                                    >
                                                        강아지
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDEDD1"
                                                    >
                                                        푸들
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDE5BC"
                                                    >
                                                        여
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDDDA7"
                                                    >
                                                        2살
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDD592"
                                                    >
                                                        중성화O
                                                    </Tag>
                                                </Space>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <>
                                                        <div style={{ margin: 0, display: 'inline-block' }}>
                                                            {item.userTitle}
                                                            <span
                                                                style={{
                                                                    fontSize: 13,
                                                                    padding: '5px 15px',
                                                                    color: '#E79C0D',
                                                                    backgroundColor: '#FCF5E6',
                                                                    borderRadius: 15,
                                                                    border: 'solid 1px #FCDB95',
                                                                    width: 'fitContent',
                                                                    marginLeft: 5,
                                                                    display: 'inline-block'
                                                                }}
                                                            >
                                                                {item.petSymptom}
                                                            </span>
                                                        </div>
                                                        {item.status === 'H' ? (
                                                            <></>
                                                        ):( 
                                                            <Button
                                                                type="text"
                                                                style={{
                                                                    padding: 0,
                                                                    borderRadius: 10,
                                                                    color: '#747474',
                                                                    float: 'right',
                                                                }}
                                                                onClick={() => {
                                                                    setReceptionStep('Step3');
                                                                    setReceptionModal(true);
                                                                }}
                                                            >
                                                                <EditOutlined />
                                                                <span style={{ fontSize: '0.7rem', marginLeft: 3 }}>수정</span>
                                                            </Button>
                                                        )}
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
                                    <div style={{ width: '40%', alignSelf: 'center' }}>
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
                                                >
                                                    {
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
                                <div key="statusBtn" style={{ width: '10%', padding: 10, alignSelf: 'center' }}>
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
                                        ) : item.status === 'N' ? (
                                            <>
                                                <Button
                                                    type="text"
                                                    style={{
                                                        height: '5.0rem',
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
                                                >
                                                    <span>예약취소</span>
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    type="primary"
                                                    style={{
                                                        height: '8rem',
                                                        borderRadius: 10,
                                                        color: '#23180C',
                                                        float: 'right',
                                                        alignSelf: 'center',
                                                        backgroundColor: '#FBE7A2',
                                                        fontWeight: 600,
                                                        width: '7rem'
                                                    }}
                                                    onClick={() => setShowResult(true)}
                                                >
                                                    <span>상담결과 <br /> 보기</span>
                                                </Button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    )}
                />
            </div>
            {receptionModal && (
                <ReceptionCreate
                    closeModal={() => setReceptionModal(false)}
                    open={receptionModal}
                />
            )}
            {
                showResult && (
                    <ConsultResultDetailModal
                        closeModal={() => setShowResult(false)}
                        open={showResult}
                    />
                )
            }
            {
                openNameModal && (
                    <>
                        <Modal
                            title="이름을 입력해주세요."
                            open={openNameModal}
                            onOk={handleOk}
                            onCancel={() => setOpenNameModal(false)}
                        >
                            이름
                            <Input value={nameState} onChange={e => setNameState(e.target.value)} />
                        </Modal>
                    </>
                )
            }
        </>
    );
};

export default UserConsultList;