import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { findStateAtom } from '..';

export const FindPwByMailStepOne = () => {
    const [form] = Form.useForm();
    const [ , setFindState] = useRecoilState<string>(findStateAtom);

    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: '#f7f7f7',
                    width: '100%',
                    borderRadius: 20,
                    paddingTop: '4rem',
                    marginTop: '2rem'
                }}>
                <Row>
                    <Col span={24}>
                        <span style={{ fontSize: '1.3em' }}><strong>홍길동</strong>님, 새로운 비밀번호를 설정해주세요.</span>
                    </Col>
                </Row>
                <Form
                    form={form}
                >
                    <Row style={{marginTop: '2rem'}}>
                        <Col span={5} style={{textAlign: 'right'}}>
                            <span>비밀번호</span>
                        </Col>
                        <Col span={2}/>
                        <Col span={15}>
                            <Form.Item
                                name='pswd'
                                style={{ margin: 0 }}
                            >
                                <Input.Password />
                            </Form.Item>
                            <div className="signUpInfoNotice" style={{textAlign: 'right'}}>
                                <span style={{ fontSize: 15}}>• 영문, 숫자, 특수문자를 포함 8~30 자리</span>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '1rem'}}>
                        <Col span={5} style={{textAlign: 'right'}}>
                            <span>비밀번호 확인</span>
                        </Col>
                        <Col span={2}/>
                        <Col span={15}>
                            <Form.Item
                                name='repswd'
                                style={{ margin: 0 }}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div>
                    <Button
                        block
                        size='large'
                        type="primary"
                        className="btn-round mb-3"
                        htmlType='submit'
                        style={{ 
                            height: '3em',
                            fontSize: 20,
                            marginTop: '4rem',
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20
                        }}
                        onClick={() => setFindState('pwByMailTwo')}
                    >
                        완료
                    </Button>
                </div>
            </div>
        </>
    )
}