import React, { useState } from 'react';
import { Button, Checkbox, Descriptions, Form, Input } from 'antd';
import { PswdUpdateModal } from 'features/mypage/user/info/pages/PswdUpdateModal';

const VetInfoUpdate = () => {
    
    //비밀번호 변경 팝업
    const [pswdUpdateModal, setPswdUpdateModal] = useState<boolean>(false);

    const list = [
        { label: '내과', value: '01' },
        { label: '외과', value: '02' },
        { label: '치과', value: '03' },
        { label: '신경과', value: '04' },
        { label: '동물행동과', value: '05' },
        { label: '질병예방과', value: '06' },
    ];
    
    return (
        <>
            <Form
            //form={form}
            //onFinish={value => onFinish(value)}
            >
                <Descriptions
                    style={{borderTop: 'solid #747474 2px', marginBottom: '1rem' }}
                    column={4} bordered>
                    <Descriptions.Item
                        span={4}
                        label="사용자 ID"
                        labelStyle={{
                            width: '10%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '60%'
                        }}>
                        tg
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="수의사명"
                        labelStyle={{
                            width: '10%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '60%'
                        }}>
                        <Form.Item
                            noStyle
                            rules={[{ required: true, message: '수의사명을 입력해주세요.' }]}
                        >
                            <Input
                                style={{ width: '20rem' }}
                            />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="동물병원명"
                        labelStyle={{
                            width: '10%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '60%'
                        }}>
                        <Form.Item
                            noStyle
                            rules={[{ required: true, message: '동물병원명을 입력해주세요.' }]}
                        >
                            <Input
                                style={{ width: '20rem' }}
                            />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="전문분야"
                        labelStyle={{
                            width: '10%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '60%'
                        }}>
                        <Form.Item
                            noStyle
                            rules={[{ required: true, message: '전문분야를 선택해주세요.' }]}
                            name=''
                        >
                            <Checkbox.Group
                                options={list}
                            />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="연락처"
                        labelStyle={{
                            width: '10%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '60%'
                        }}>
                        <Form.Item
                            name='mbrTelno'
                            style={{ margin: 0 }}
                            rules={[
                                { required: true, message: '연락처를 입력해주세요.' }
                            ]}
                        >
                            <Input style={{ width: '20rem' }} />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="이메일"
                        labelStyle={{
                            width: '10%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '60%'
                        }}>
                        <Form.Item
                            name='mbrEmlAddr'
                            style={{ margin: 0 }}
                            rules={[
                                { required: true, message: '이메일을 입력해주세요.' },
                                { pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '이메일 형식에 맞지 않습니다. 다시 확인해주세요.' }
                            ]}
                        >
                            <Input style={{ width: '20rem' }} />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="비밀번호 수정"
                        labelStyle={{
                            width: '10%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '60%'
                        }}>
                        <Button
                            type='primary'
                            size='middle'
                            style={{
                                marginRight: 5,
                                color: 'black'
                            }}
                            onClick={() => setPswdUpdateModal(true)}
                        >
                            비밀번호 변경하기
                        </Button>
                    </Descriptions.Item>
                </Descriptions>

                <div>
                    <div style={{ float: 'left'}}>
                        <span
                            style={{
                                textDecoration: 'underline',
                                color: '#F7A95B',
                                cursor: 'pointer'
                            }}
                        //onClick={() => setOpenConfirm(true)}
                        >
                            탈퇴하기
                        </span>
                    </div>
                    <div style={{ float: 'right'}}>
                        <Button
                            type='primary'
                            size='middle'
                            htmlType='submit'
                            style={{
                                color: 'black'
                            }}
                        >
                            내 정보 수정
                        </Button>
                    </div>
                </div>
            </Form >
            {
                pswdUpdateModal && (
                    <PswdUpdateModal
                        closePswdModal={() => setPswdUpdateModal(false)}
                        open={pswdUpdateModal}
                    />
                )
            }
        </>
    )
}

export default VetInfoUpdate;