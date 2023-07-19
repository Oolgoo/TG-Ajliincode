import { Descriptions, Modal, ModalProps } from "antd";
import React from 'react';
import foot from 'assets/img/foot.png';
import { VerticalAlignBottomOutlined } from "@ant-design/icons";

interface SurveyListModalProps extends ModalProps {
    closeModal: () => void;
}

export const SurveyListModal = (props: SurveyListModalProps) => {
    const { open, closeModal } = props;

    return (
        <>
            <Modal
                maskClosable={false}
                closable
                destroyOnClose
                onCancel={() => {
                    closeModal();
                }}
                open={open}
                footer={false}
                width={'40%'}
                style={{top: 20}}
            >
                <h2 style={{ textAlign: 'center' }}>초코 문진표</h2>
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <span style={{ fontSize: 12 }}>작성일시 : 2023-04-20 12:30 pm</span>
                </div>
                <Descriptions bordered>
                    <Descriptions.Item
                        label="이름"
                        labelStyle={{
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                            width: '15%'
                        }}
                        contentStyle={{
                            width: '28%'
                        }}>
                        초코
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="품종"
                        labelStyle={{
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                            width: '15%'
                        }}
                        contentStyle={{
                            width: '15%'
                        }}>
                        푸들
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="성별"
                        labelStyle={{
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                            width: '12%'
                        }}
                        contentStyle={{
                            width: '15%'
                        }}>
                        여자
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={1}
                        label="생년월일"
                        labelStyle={{
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                            width: '15%'
                        }}
                        contentStyle={{
                            width: '28%'
                        }}>
                        2022년 10월 20일
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={2}
                        label="중성화여부"
                        labelStyle={{
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                            width: '15%',
                            padding: 0
                        }}
                        contentStyle={{
                            width: '42%'
                        }}>
                        중성화 했어요
                    </Descriptions.Item>
                </Descriptions>
                <div style={{ height: 650, overflowY: 'scroll' }}>
                    <Descriptions
                        title={
                            <>
                                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                                오늘 어떤 상담을 받으러 오셨나요?
                            </>
                        }
                        bordered
                        style={{
                            marginTop: '2rem'
                        }}>
                        <Descriptions.Item
                            span={3}
                            label="어디가 아파서 오셨나요?"
                            labelStyle={{
                                width: '43%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '57%'
                            }}>
                            초코가 사료를 잘 먹지 않아요
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label="언제부터 아팠나요?"
                            labelStyle={{
                                width: '43%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '57%'
                            }}>
                            한달정도 된 것 같아요
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label="다른 병원에서 상담 받은 적이 있나요?"
                            labelStyle={{
                                width: '43%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '57%'
                            }}>
                            아니요
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title={
                            <>
                                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                                기초 예방에 대한 질문입니다.
                            </>
                        }
                        bordered
                        style={{
                            marginTop: '2rem'
                        }}>
                        <Descriptions.Item
                            span={3}
                            label={
                                <>
                                    <span>기초 예방접종은 하셨나요?</span>
                                    <br />
                                    <span style={{ fontSize: 13, fontWeight: 400 }}>&#40;기초 예방접종은 어릴 때 진행하는 강아지 5차접종, 고양이 3차접종을 의미합니다.&#41;</span>
                                </>
                            }
                            labelStyle={{
                                width: '80%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '20%',
                                textAlign: 'center'
                            }}>
                            예
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label={
                                <>
                                    <span>추가 예방접종은 최근 1년 이내에 하셨나요?</span>
                                    <br />
                                    <span style={{ fontSize: 13, fontWeight: 400 }}>&#40;추가 예방접종은 1년에 1회 진행하는 보강 접종입니다.&#41;</span>
                                </>
                            }
                            labelStyle={{
                                width: '80%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '20%',
                                textAlign: 'center'
                            }}>
                            예
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label="항체 검사는 하셨나요?"
                            labelStyle={{
                                width: '80%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '20%',
                                textAlign: 'center'
                            }}>
                            잘 모름
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label={
                                <>
                                    <span>심장사상충 예방은 하고 계신가요?</span>
                                    <br />
                                    <span style={{ fontSize: 13, fontWeight: 400 }}>&#40;심장사상충 예방은 휴약없이 매월 진행해야 합니다.&#41;</span>
                                </>
                            }
                            labelStyle={{
                                width: '80%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '20%',
                                textAlign: 'center'
                            }}>
                            예
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label="심장사상충 검사를 받으신 적이 있나요?"
                            labelStyle={{
                                width: '80%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '20%',
                                textAlign: 'center'
                            }}>
                            아니요
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title={
                            <>
                                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                                과거 상담 결과
                            </>
                        }
                        bordered
                        style={{
                            marginTop: '2rem'
                        }}>
                        <Descriptions.Item
                            span={3}
                            label={
                                <>
                                    <span>증상과 관련해서 투약중인 약물이 있나요?</span>
                                    <br />
                                    <span style={{ fontSize: 13, fontWeight: 400 }}>&#40;어떤 종류의 약물인지 알고 계시면 적어주세요.&#41;</span>
                                </>
                            }
                            labelStyle={{
                                width: '60%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '40%',
                                textAlign: 'center'
                            }}>
                            예
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label="마지막으로 약을 먹인 날짜는요?"
                            labelStyle={{
                                width: '60%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '40%',
                                textAlign: 'center'
                            }}>
                            지난주 목요일
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label="어떤 질환인지 질병명을 알고 계신가요?"
                            labelStyle={{
                                width: '60%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '40%',
                                textAlign: 'center'
                            }}>
                            잘 모름
                        </Descriptions.Item>
                        <Descriptions.Item
                            span={3}
                            label="어느 병원에서 상담을 받으셨나요?"
                            labelStyle={{
                                width: '60%',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                            }}
                            contentStyle={{
                                width: '40%',
                                textAlign: 'center'
                            }}>
                            서울동물병원
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title={
                            <>
                                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                                첨부파일
                            </>
                        }
                        bordered
                        style={{
                            marginTop: '2rem'
                        }}>
                        <Descriptions.Item span={3}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '90%'}}>
                                    초코 사진.jpg
                                </div>
                                <div style={{width: '10%', textAlign: 'right'}}>
                                    <VerticalAlignBottomOutlined />
                                </div>
                            </div>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
        </>
    )
}