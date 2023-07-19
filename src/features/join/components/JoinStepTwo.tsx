import { Button,  Divider, Form, Input} from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { joinStepAtom } from '../recoils';

export const JoinStepTwo = () => {
    const [form] = Form.useForm();

    const [ , setJoinStep] = useRecoilState(joinStepAtom);

    return (
        <>
            <p style={{ fontSize: '1.5em' }}>ANIWIDE 서비스 이용을 위해 회원정보를 입력해 주세요.</p>
            <Divider />
            <Form
                form={form}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '20%', textAlign: 'right', marginRight: '10%' }}>
                        <label>아이디</label>
                        <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div style={{ width: '70%' }}>
                        <Form.Item
                            style={{ margin: 0 }}
                            >
                            <Input
                                style={{ width: '80%', height: '2.5em' }}
                                placeholder="아이디" />
                        </Form.Item>
                        <div
                            className="signUpInfoNotice"
                            style={{ marginTop: 5 }}
                        >
                            <span>• 3~16자의 영문 또는 영문 + 숫자만 입력해주세요.</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div style={{ width: '20%', textAlign: 'right', marginRight: '10%' }}>
                        <label>비밀번호</label>
                        <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div style={{ width: '70%' }}>
                        <Form.Item
                            name='pswd'
                            rules={[
                                { required: true, message: '비밀번호를 입력해주세요.' },
                                { pattern: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,30}$/, message: '영문, 숫자, 특수문자를 포함 8~30 자리로 입력해주세요.' }
                            ]}
                            style={{ margin: 0 }}
                        >
                            <Input.Password style={{ width: '80%', height: '2.5em' }} placeholder="비밀번호" />
                        </Form.Item>
                        <div
                            className="signUpInfoNotice"
                            style={{ marginTop: 5 }}
                        >
                            <span>• 영문, 숫자, 특수문자를 포함 8~30 자리로 입력해주세요.</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div style={{ width: '20%', textAlign: 'right', marginRight: '10%' }}>
                        <label>비밀번호 확인</label>
                        <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div style={{ width: '70%' }}>
                        <Form.Item
                            name='repswd'
                            rules={[
                                { required: true, message: '비밀번호를 입력해주세요.' },
                                { pattern: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,30}$/, message: '' }
                            ]}
                        >
                            <Input.Password style={{ width: '80%', height: '2.5em' }} placeholder="비밀번호 확인" />
                        </Form.Item>
                    </div>
                </div>
                <Divider/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '20%', textAlign: 'right', marginRight: '10%' }}>
                        <label>이름</label>
                        <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div style={{ width: '70%' }}>
                        <Form.Item
                            name='mbrNm'
                            rules={[{ required: true, message: '이름을 입력해주세요.' }]}
                        >
                            <Input style={{ width: '80%', height: '2.5em' }} placeholder="이름" />
                        </Form.Item>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '20%', textAlign: 'right', marginRight: '10%' }}>
                        <label>연락처</label>
                        <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div style={{ width: '70%' }}>
                        <Form.Item
                            name='mbrTelno'
                            rules={[
                                { required: true, message: '연락처를 입력해주세요.' },
                                { pattern: /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/, message: '(-)제외, 번호를 다시 확인해주세요.' }
                            ]}
                        >
                            <Input
                                style={{ width: '80%', height: '2.5em' }}
                                maxLength={12}
                                placeholder="번호입력 (-없이 입력)" />
                        </Form.Item>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '20%', textAlign: 'right', marginRight: '10%' }}>
                        <label>이메일</label>
                        <span style={{ color: 'red' }}>*</span>
                    </div>
                    <div style={{ width: '70%' }}>
                        <Form.Item
                            name='mbrEmlAddr'
                            rules={[
                                { required: true, message: '이메일을 입력해주세요.' },
                                { pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '이메일 형식에 맞지 않습니다. 다시 확인해주세요.' }
                            ]}
                        >
                            <Input
                                style={{ width: '80%', height: '2.5em' }}
                                placeholder="이메일" />
                        </Form.Item>
                    </div>
                </div>
                <Button
                    type="primary"
                    size="large"
                    style={{ marginTop: 5, width: '100%', height: '3.5rem' }}
                    onClick={() => {
                        setJoinStep('three')
                    }} >다음
                </Button>
            </Form>

        </>
    )
}