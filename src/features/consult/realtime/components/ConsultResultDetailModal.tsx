import React from 'react';
import { Button, Descriptions, Divider, Input, Modal, ModalProps, Radio } from 'antd';
import 'assets/css/result.css';
import foot from 'assets/img/foot.png';

interface ConsultResultDetailModalProps extends ModalProps {
    closeModal: () => void;
}

export const ConsultResultDetailModal = (props: ConsultResultDetailModalProps) => {

    const { closeModal, open } = props;

    const handleConfirm = () => {
            closeModal();
    }

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
                width={'40%'}
            >
                <h2 style={{ textAlign: 'center' }}>초코 상담결과</h2>
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <span>작성일시 : 2023-04-20 12:30 pm</span>
                </div>
                <Descriptions
                    title={
                        <>
                            <img src={foot} style={{ width: 23, marginRight: 5 }} />
                            수의사
                        </>
                    }
                    bordered>
                    <Descriptions.Item
                        label="이름"
                        labelStyle={{
                            width: '20%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '30%',
                            textAlign: 'center'
                        }}>
                        홍길동
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="소속"
                        labelStyle={{
                            width: '20%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '30%',
                            textAlign: 'center'
                        }}>
                        와우동물병원
                    </Descriptions.Item>
                </Descriptions>
                <div
                    style={{
                        marginTop: '1rem'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: 23, marginRight: 5}}>
                                <img src={foot} style={{ width: 23 }} />
                            </div>
                            <h3>상담 의견</h3>
                        </div>
                    <Input.TextArea
                        maxLength={3000}
                        placeholder='내용은 최대 3000자까지 입력 가능합니다.'
                        style={{ resize: 'none', height: 200, overflowY: 'scroll' }}
                        value={'초코의 사료를 바꿔주세요'}
                        readOnly
                    />
                </div>
                <Descriptions bordered style={{ marginTop: '2rem' }}>
                    <Descriptions.Item
                        span={3}
                        label="내원 필요 여부"
                        labelStyle={{
                            width: '50%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '50%',
                            textAlign: 'center'
                        }}>
                        <Radio.Group defaultValue={'Y'} disabled>
                            <Radio value={'Y'}>예</Radio>
                            <Radio value={'N'}>아니오</Radio>
                        </Radio.Group>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={3}
                        label="사후 관리 필요 여부"
                        labelStyle={{
                            width: '50%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '50%',
                            textAlign: 'center'
                        }}>
                        <Radio.Group defaultValue={'Y'} disabled>
                            <Radio value={'Y'}>예</Radio>
                            <Radio value={'N'}>아니오</Radio>
                        </Radio.Group>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={3}
                        label="다음 상담 예약 일시"
                        labelStyle={{
                            width: '50%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center'
                        }}
                        contentStyle={{
                            width: '50%',
                            textAlign: 'center'
                        }}>
                        2023-04-28 10:00 AM
                    </Descriptions.Item>
                </Descriptions>
                <Divider />
                <div style={{ textAlign: 'right' }}>
                    <Button
                        type='primary'
                        onClick={() => handleConfirm()}>
                        확인
                    </Button>
                </div>
            </Modal>
        </>
    )
}