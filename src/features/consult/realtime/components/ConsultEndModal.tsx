import React from 'react';
import { Button, Modal, ModalProps, Typography } from "antd"
import logo from 'assets/img/logo/logoA_black2.png';

const { Title, Paragraph } = Typography;

interface ReceptionEndModalProps extends ModalProps {
    closeModal: () => void;
    closeConsult: () => void;
    showResult:() => void;
}

export const ConsultEndModal = (props: ReceptionEndModalProps) => {
    const { closeModal, open, closeConsult, showResult } = props;

    const handleOkClick = () => {
        closeConsult();
        //
    }

    const handleShowResult = () =>{
        closeModal();
        showResult();
    }

    return (
        <>
            <Modal
                centered
                open={open}
                maskClosable={false}
                closable={false}
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
                                상담이 종료되었습니다.<br />
                                다음에 또 봐요!
                            </Title>
                            <Paragraph style={{ marginLeft: 10, marginTop: 20 }}>
                                상담결과는 마이페이지에서도 조회 가능해요.
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
                                backgroundColor: '#FBE7A2',
                                fontWeight: 600,
                                width: '12rem'
                            }}
                            type="primary"
                            size='large'
                            onClick={()=> {
                                handleOkClick();
                            }}
                        >
                            확인
                        </Button>
                        <Button
                            style={{
                                height: '4rem',
                                borderRadius: 10,
                                color: '#23180C',
                                float: 'right',
                                backgroundColor: '#FBE7A2',
                                fontWeight: 600,
                                width: '12rem'
                            }}
                            type="primary"
                            size='large'
                            onClick={()=> handleShowResult()}
                        >
                            상담결과서 보기
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}