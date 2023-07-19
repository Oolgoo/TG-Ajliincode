import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { receptionStepAtom } from '../../recoils/receptionRecoil';
import { Button, Divider, Input, Radio, Space, Typography } from 'antd';
import foot from 'assets/img/foot.png';

const SurveyTwo = () => {
    const { Title, Text } = Typography;

    const receptionStep = useSetRecoilState(receptionStepAtom);

    const [survey, setSurvey] = useState<string>("N");

    const handlePreviousClick = () => {
        receptionStep('Step3');
    };

    const handleNextClick = () => {
        receptionStep('Step5');
    };

    return (
        <>
            <Typography>
                <Title level={5}>
                    <blockquote>
                        이 문제로 진료받으신 적이 있으신가요?
                    </blockquote>
                </Title>
            </Typography>
            <Divider />
            <div>
                <Typography.Title level={5}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    이 증상과 관련해서 투약중인 약물이 있나요?
                    <br />
                    <Text type="secondary">
                        (어떤 종류의 약물인지 알고 계시면 적어주세요.)
                    </Text>
                </Typography.Title>
                <Radio.Group
                    defaultValue={'N'}
                    onChange={(e) => setSurvey(e.target.value)}
                    value={survey}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Radio value={'Y'}>예</Radio>
                    <Radio value={'N'}>아니오</Radio>
                </Radio.Group>

                {survey === 'Y' && (
                    <Input
                        placeholder="증상에 대해 상세히 입력해 주세요."
                        style={{
                            marginTop: 10,
                            width: '100%',
                        }}
                    />
                )
                }

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    마지막으로 약을 먹인 날짜는요?
                </Typography.Title>
                <Input.TextArea
                    style={{
                        height: 80,
                        width: '100%',
                        resize: 'none',
                    }}
                />

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    어떤 질환인지 질병명은 알고 계신가요?
                </Typography.Title>
                <Input.TextArea
                    style={{
                        height: 80,
                        width: '100%',
                        resize: 'none',
                    }}
                />

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    어느 병원에서 진료를 받으셨나요?
                </Typography.Title>
                <Input.TextArea
                    style={{
                        height: 80,
                        width: '100%',
                        resize: 'none',
                    }}
                />
            </div>

            <Divider />

            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Space wrap>
                    <Button
                        size='large'
                        style={{
                            borderRadius: 5,
                            width: 150,
                        }}
                        onClick={handlePreviousClick}
                    >
                        <span>이전</span>
                    </Button>

                    <Button
                        size='large'
                        type="primary"
                        block
                        style={{
                            borderRadius: 5,
                            width: 300,
                            color: 'black',
                        }}
                        onClick={handleNextClick}
                    >
                        <span>다음</span>
                    </Button>
                </Space>
            </div>
        </>
    );
};

export default SurveyTwo;
