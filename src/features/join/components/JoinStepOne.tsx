import { CheckOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { joinStepAtom } from '../recoils/JoinRecoil';

export const JoinStepOne = () => {

    const [aniCheck, setAniCheck] = useState<boolean>();
    const [privCheck, setPrivCheck] = useState<boolean>();
    const [sensiCheck, setSensiCheck] = useState<boolean>();

    const allCheckState = () => {
        aniCheck ? setAniCheck(aniCheck) : setAniCheck(!aniCheck);
        privCheck ? setPrivCheck(privCheck) : setPrivCheck(!privCheck);
        sensiCheck ? setSensiCheck(sensiCheck) : setSensiCheck(!sensiCheck);
        (aniCheck && privCheck && sensiCheck) && setAniCheck(!aniCheck);
        (aniCheck && privCheck && sensiCheck) && setPrivCheck(!privCheck);
        (aniCheck && privCheck && sensiCheck) && setSensiCheck(!sensiCheck);
    }

    const [ , setJoinStep] = useRecoilState(joinStepAtom);

    return (
        <>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                            <p style={{ fontSize: '1.5em' }}>ANIWIDE 서비스 이용을 위해 약관에 동의해주세요.</p>
                            <Divider/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button style={{
                                marginTop: 5,
                                border: '1px solid #e9e9e9',
                                cursor: 'pointer',
                                height: '4rem',
                                width: '12rem'
                            }}
                                onClick={() => allCheckState()}
                            >
                                <CheckOutlined style={{ marginRight: '2em' }} />
                                <strong>모든약관동의</strong>
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 50 }}>
                        <Col span={24}>
                            <span style={{ fontSize: 17 }}>모든 약관 동의는 필수 약관 및 광고성 수신 동의가 포함되어 있으며,<br />선택 항목에 대한 동의를 거부하는 경우에도 회원가입은 정상적으로 진행됩니다.</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 50 }}>
                        <Col span={20}>
                            <span style={{ fontSize: 17 }}>
                                <Checkbox
                                    style={{ marginRight: 5 }}
                                    checked={aniCheck}
                                    onChange={() => setAniCheck(!aniCheck)}
                                />[필수] ANIWIDE 이용약관
                            </span>
                        </Col>
                        <Col span={4} >
                            <span className='termsItemMore' style={{ float: 'right', fontSize: 17 }}>보기</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={20}>
                            <span style={{ fontSize: 17 }}>
                                <Checkbox
                                    style={{ marginRight: 5 }}
                                    checked={privCheck}
                                    onChange={() => setPrivCheck(!privCheck)}
                                />[필수] 개인정보 수집 및 이용 동의
                            </span>
                        </Col>
                        <Col span={4} >
                            <span className='termsItemMore' style={{ float: 'right', fontSize: 17 }}>보기</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={20}>
                            <span style={{ fontSize: 17 }}>
                                <Checkbox
                                    style={{ marginRight: 5 }}
                                    checked={sensiCheck}
                                    onChange={() => setSensiCheck(!sensiCheck)}
                                />[필수] 민감정보 항목 수집 동의
                            </span>
                        </Col>
                        <Col span={4} >
                            <span className='termsItemMore' style={{ float: 'right', fontSize: 17 }}>보기</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 50 }}>
                        <Col span={24}>
                            <Button
                                type="primary"
                                size="large"
                                style={{ marginTop: 5, width: '100%', height: '3.5rem' }}
                                onClick={() => {
                                    setJoinStep('two')
                                }} >다음
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}