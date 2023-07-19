import React from 'react';
import { Button, Col, Form, Input, Modal, ModalProps, Row } from "antd";
import { useEffect } from "react";

interface PswdUpdateModalProps extends ModalProps {
    closePswdModal: () => void;
}

export const PswdUpdateModal = (props: PswdUpdateModalProps) => {
    //from 세팅
    const [form] = Form.useForm();

    const { open, closePswdModal } = props;
    
    //MODAL 닫을 때, INPUT 초기화
    useEffect(() => {
        if (!open) {
            form.setFieldValue('pswd', '');
            form.setFieldValue('repswd', '');
        }
    }, [open])
    
    return (
        <>
            <Modal
                maskClosable={false}
                title={'비밀번호 변경'}
                closable
                destroyOnClose
                onCancel={() => {
                    closePswdModal();
                }}
                open={open}
                footer={false}
            >
                <Form
                    // form={form}
                    // onFinish={value => onFinish(value)}
                >
                    <Row style={{ marginTop: 50, paddingBottom: 10 }}>
                        <Col span={10}>
                            <span>비밀번호 수정</span>
                        </Col>
                        <Col span={14}>
                            <Form.Item
                                name='pswd'
                                rules={[
                                    { required: true, message: '비밀번호를 입력해주세요' },
                                    { pattern: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,30}$/, message: '영문, 숫자, 특수문자를 포함 8~30 자리로 입력해주세요.' }
                                ]}
                                style={{margin: 0}}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: 10 }}>
                        <Col span={10}>
                            <span>비밀번호 확인</span>
                        </Col>
                        <Col span={14}>
                            <Form.Item
                                name='repswd'
                                rules={[
                                    { required: true, message: '비밀번호를 확인해주세요' },
                                    ({ getFieldValue }) => ({
                                        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
                                        validator(_, value) {
                                            if (!value || getFieldValue('pswd') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다. 다시 확인해주세요.'));
                                        },
                                    }),
                                    { pattern: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,30}$/ }
                                ]}
                                style={{margin: 0}}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='end' style={{ marginTop: 15 }} >
                        <Button
                            style={{ marginRight: 5 }}
                            type="primary"
                            htmlType='submit'
                        >
                            저장
                        </Button>
                        <Button
                            onClick={() => {
                                closePswdModal();
                            }}
                        >
                            닫기
                        </Button>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}