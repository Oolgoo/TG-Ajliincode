import React from 'react';
import { Col, Row, Steps } from "antd";
import 'assets/css/sign.css';
import { useRecoilValue } from 'recoil';
import { JoinStepOne, JoinStepThree, JoinStepTwo, joinStepAtom } from '..';

const JoinContainer = () => {

    const joinStep = useRecoilValue(joinStepAtom);

    return (
        <>
            <Row style={{ marginTop: '2rem' }}>
                <Col span={4} />
                <Col span={16}>
                    <Row style={{ marginBottom: 30 }}>
                        <Col span={24}>
                            <Steps
                                type="navigation"
                                size="default"
                                current={joinStep === 'one' ? 0 : joinStep === 'two' ? 1 : 2}
                                className="site-navigation-steps"
                                items={[
                                    {
                                        status: joinStep === 'one' ? 'process' : 'finish',
                                        title: '약관동의',
                                    },
                                    {
                                        status: joinStep === 'one' ? 'wait' : joinStep === 'two' ? 'process' : 'finish',
                                        title: '정보입력',
                                        disabled: true
                                    },
                                    {
                                        status: joinStep === 'three' ? 'process' : 'wait',
                                        title: '가입완료',
                                        disabled: true,
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 70 }}>
                        <Col span={24}>
                            {joinStep === 'one' && <JoinStepOne />}
                            {joinStep === 'two' && <JoinStepTwo />}
                            {joinStep === 'three' && <JoinStepThree />}
                        </Col>
                    </Row>
                </Col>
                <Col span={4} />
            </Row>
        </>
    )
}
export default JoinContainer;