import { Button, Divider, Typography } from 'antd';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { receptionStepAtom } from '../../recoils/receptionRecoil';
import logo from 'assets/img/logo/logoA_black2.png';

const { Title, Paragraph, Text } = Typography;

const Agreement = () => {
    const handleOkClick = () => {
        receptionStep('Step1');
    };

    const receptionStep = useSetRecoilState(receptionStepAtom);

    return (
        <>
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
                        //border: '1px solid #eee',
                        //height: 200
                    }}
                >
                    <Typography>
                        <Title level={5}>
                            <blockquote>
                                ANIWIDE에서는 다음과 같은 서비스는 제공하지 않습니다.
                            </blockquote>
                        </Title>
                        <Paragraph style={{ marginLeft: 10 }}>
                            <ul>
                                <li>직접 검사/진료 및 처방전 발급</li>
                                <li>처방약에 대한 투약 방법 및 지침</li>
                                <li>과거 수의사의 진단 또는 치료에 대한 추가 의견</li>
                            </ul>
                        </Paragraph>
                    </Typography>
                </div>

                <div
                    style={{
                        marginTop: 50
                    }}
                >
                    <Divider orientation="left" orientationMargin={20}>
                        주의
                    </Divider>

                    <Typography>
                        <Paragraph style={{ marginLeft: 10 }}>
                            <Text type="secondary">
                                반려동물에게 위급한 상황이 발생할 경우 즉시 병원을 방문하시기 바랍니다.
                            </Text>
                        </Paragraph>
                    </Typography>
                </div>
                
                <Divider />

                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Button
                        type="primary"
                        size='large'
                        style={{
                            borderRadius: 5,
                            width: 300,
                            color: 'black',
                        }}
                        onClick={handleOkClick}
                    >
                        <span>동의</span>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Agreement;
