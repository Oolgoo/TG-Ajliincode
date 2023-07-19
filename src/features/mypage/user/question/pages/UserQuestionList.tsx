import { Button, Card, List, Space, Tag, Image, Badge, Typography } from 'antd';
import { MainContentHeader } from 'common';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_ASK_DETAIL_WITH_ID } from 'routes/const';
import { AddQuestionModal } from '../components';
import { data } from 'features/consult/reception/pages/Data';

const UserQuestionList = () => {
    const navigate = useNavigate();
    const { Title } = Typography;

    const [addQuestion, setAddQuestion] = useState<boolean>(false);

    const content = `반려동물에 대해 모든 걸 물어보세요! ANIWIDE의 수의사 분들께서 상담해 주실 거에요!`;

    return (
        <>
            <MainContentHeader title={`MY 질문 내역`} content={content} />
            <div style={{ display: "flex", justifyContent: 'start', marginBottom: '1rem' }}>
                <Card style={{ width: '25%', marginRight: '2rem', borderTop: 'solid 2px #747474' }}>
                    <h2>나의 질문</h2>
                    <h3>4건</h3>
                </Card>
                <Card style={{ width: '25%', marginRight: '2rem', borderTop: 'solid 2px #747474' }}>
                    <h2>답변 완료</h2>
                    <h3>2건</h3>
                </Card>
                <Card style={{ width: '25%', borderTop: 'solid 2px #747474' }}>
                    <h2>답변 미완료</h2>
                    <h3>2건</h3>
                </Card>
            </div>
            <Title level={3} style={{ display: 'inline-block' }}>나의 질문 목록</Title>
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
                            <Badge.Ribbon
                                style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderTopRightRadius: 5 }}
                                text={item.status === 'Y' ? '답변완료' : item.status === 'N' ? '답변미완료' : '추가답변미완료'}
                                color={item.status === 'Y' ? '#8FBC8B' : '#F67953'}>
                                <div
                                    style={{
                                        border: '1px solid #e9e9e9',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem',
                                        marginTop: '0.5rem',
                                        height: '11rem'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '15%',
                                            textAlign: 'center',
                                            padding: 15
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
                                    <div style={{ width: '70%', margin: 10 }}>
                                        <List.Item
                                            key={item.userTitle}
                                            style={{
                                                height: '10rem',
                                                width: '100%',
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
                                                    <span>19명이 이 질문에 도움을 받았습니다.</span>
                                                </Space>
                                            ]}
                                            onClick={() => navigate(ROUTE_ASK_DETAIL_WITH_ID(1))}
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
                                    <div key="statusBtn" style={{ width: '15%' }}>
                                        {
                                            item.status === 'Y' ? (
                                                <>
                                                    <Button
                                                        type="primary"
                                                        style={{
                                                            height: '2.5em',
                                                            borderRadius: 5,
                                                            color: '#23180C',
                                                            float: 'right',
                                                            position: 'absolute',
                                                            bottom: 10,
                                                            right: 10,
                                                            fontWeight: 600,
                                                            backgroundColor: '#FBE7A2'
                                                        }}
                                                        onClick={() => setAddQuestion(true)}
                                                    >
                                                        <span>추가질문하기</span>
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </Badge.Ribbon>
                        </>
                    )}
                />
            </div>
            {
                addQuestion && (
                    <AddQuestionModal
                        closeModal={() => setAddQuestion(false)}
                        open={addQuestion}
                    />
                )
            }
        </>
    );
};

export default UserQuestionList;