import React from 'react';
import { Button, Modal, ModalProps, Typography, message } from "antd";
import logo from 'assets/img/logo/logoA_black2.png';

interface CancleModalProps extends ModalProps {
    closeModal: () => void;
}

const { Title, Paragraph } = Typography;

export const CancleModal = (props: CancleModalProps) => {
    const { closeModal, open } = props;

    return (
        <>
            <Modal
                centered
                open={open}
                onCancel={closeModal}
                maskClosable={false}
                closable
                destroyOnClose
                footer={false}
                width={'30%'}
            >
                <div
                    style={{
                        minHeight: 300,
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 10
                        }}
                    >
                        <img src={logo} height="40" alt="react-logo" />
                    </div>
                    <div
                        style={{
                            textAlign: 'center'
                        }}>
                        <Typography>
                            <Title level={4}>
                                고객님의 예약일은<br/>
                                2023년 04월 25일 14:30<br/>
                                입니다.
                            </Title>
                            <Paragraph style={{ marginLeft: 10, marginTop: 20 }}>
                                예약을 정말 취소하시겠습니까?<br/>
                                * 예약취소시 해당 시간에 예약하지 못하실 수 있습니다.
                            </Paragraph>
                        </Typography>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: '2.5rem'
                        }}>
                        <Button
                            style={{
                                height: '4rem',
                                borderRadius: 10,
                                color: '#23180C',
                                float: 'right',
                                backgroundColor: '#dbdbdb',
                                fontWeight: 600,
                                width: '12rem'
                            }}
                            type="primary"
                            size='large'
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            뒤로가기
                        </Button>
                        <Button
                            style={{
                                height: '4rem',
                                borderRadius: 10,
                                color: '#ffffff',
                                float: 'right',
                                backgroundColor: '#d84242',
                                fontWeight: 600,
                                width: '12rem'
                            }}
                            type="primary"
                            size='large'
                            onClick={() => {
                                message.success('예약이 취소되셨습니다.');
                                closeModal();
                            }}
                        >
                            예약취소
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}