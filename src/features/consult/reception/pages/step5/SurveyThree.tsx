import { Button, Divider, Radio, Space, Typography } from 'antd';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { haveConsultYnAtom, receptionStepAtom } from '../../recoils/receptionRecoil';
import foot from 'assets/img/foot.png';

const SurveyThree = () => {
    const { Title, Text } = Typography;

    const receptionStep = useSetRecoilState(receptionStepAtom);
    const haveConsultYn = useRecoilValue(haveConsultYnAtom);

    const handlePreviousClick = () => {
        if (haveConsultYn) {
            receptionStep('Step4');
        } else {
            receptionStep('Step3');
        }
    };

    const handleNextClick = () => {
        receptionStep('Step6');
    };

    return (
        <>
            <Typography>
                <Title level={5}>
                    <blockquote>기초 예방에 대해 알려주세요!</blockquote>
                </Title>
            </Typography>
            <Divider />
            <div>
                <Typography.Title level={5}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    기초 예방접종은 하셨나요?
                    <br />
                    <Text type="secondary">
                        (기초예방접종은 어릴때 진행하는 강아지 5차접종, 고양이 3차 접종을 의미합니다.)
                    </Text>
                </Typography.Title>
                <Radio.Group
                    defaultValue={'N'}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Radio value={'Y'}>예</Radio>
                    <Radio value={'N'}>아니오</Radio>
                    <Radio value={'P'}>진행중</Radio>
                    <Radio value={'U'}>잘모름</Radio>
                </Radio.Group>

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    추가 예방 접종은 최근 1년 이내에 하셨나요?
                    <br />
                    <Text type="secondary">
                        (추가 예방 접종은 1년에 1회 진행하는 보강 접종입니다.)
                    </Text>
                </Typography.Title>
                <Radio.Group
                    defaultValue={'N'}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Radio value={'Y'}>예</Radio>
                    <Radio value={'N'}>아니오</Radio>
                    <Radio value={'U'}>잘모름</Radio>
                </Radio.Group>

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    항체 검사는 하셨나요?
                </Typography.Title>
                <Radio.Group
                    defaultValue={'N'}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Radio value={'Y'}>예</Radio>
                    <Radio value={'N'}>아니오</Radio>
                    <Radio value={'U'}>잘모름</Radio>
                </Radio.Group>

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    심장사상충 예방은 하고 계신가요?
                    <br />
                    <Text type="secondary">
                        (심장사상충 예방은 휴약 없이 매월 진행해야합니다.)
                    </Text>
                </Typography.Title>
                <Radio.Group
                    defaultValue={'N'}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Radio value={'Y'}>예</Radio>
                    <Radio value={'N'}>아니오</Radio>
                    <Radio value={'U'}>잘모름</Radio>
                </Radio.Group>

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    심장사상충 검사를 받으신적이 있나요?
                </Typography.Title>
                <Radio.Group
                    defaultValue={'N'}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Radio value={'Y'}>예</Radio>
                    <Radio value={'N'}>아니오</Radio>
                    <Radio value={'U'}>잘모름</Radio>
                </Radio.Group>
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

export default SurveyThree;
