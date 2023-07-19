import { Button, Col, Divider, Form, Input, Modal, ModalProps, Row } from 'antd';
import React from 'react';
import { findStateAtom } from '../recoils/FindAccountRecoils';
import { useRecoilState } from 'recoil';

interface FindPwByMailModalProps extends ModalProps {
    closeModal: () => void;
}
export const FindPwByMailModal = (props: FindPwByMailModalProps) => {
    const { open, closeModal } = props;

    const [, setFindState] = useRecoilState<string>(findStateAtom);
    
    return(
        <>
        <Modal
            maskClosable={false}
            title={'이메일 인증'}
            closable
            destroyOnClose
            onCancel={() => {
                closeModal();
            }}
            open={open}
            footer={false}
        >
            <Divider/>
            <Form
                // form={form}
                // onFinish={value => onFinish(value)}
            >
                <Row style={{ marginTop: 50, paddingBottom: 10 }}>
                    <Col span={7}>
                        <span>이메일</span>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='mail'
                            style={{margin: 0}}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Button style={{float: 'right'}}>
                            전송요청
                        </Button>
                    </Col>
                </Row>
                <Row style={{ paddingBottom: 10 }}>
                    <Col span={7}>
                        <span>인증번호 확인</span>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            style={{margin: 0}}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Button
                            type='primary'
                            style={{float: 'right'}}
                            onClick={() => {
                                closeModal();
                                setFindState('pwByMailOne');
                            }}
                            >
                            확인
                        </Button>
                    </Col>
                </Row>
                <Divider/>
                <Row justify='end'>
                    <Button
                        onClick={() => {
                            closeModal();
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