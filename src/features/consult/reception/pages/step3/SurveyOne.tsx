import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { haveConsultYnAtom, receptionStepAtom } from '../../recoils/receptionRecoil';
import { Button, Divider, Input, Radio, Space, Typography } from 'antd';
import foot from 'assets/img/foot.png';

const SurveyOne = () => {
    const { Title, Text } = Typography;

    const receptionStep = useSetRecoilState(receptionStepAtom);
    const haveConsultYn = useSetRecoilState(haveConsultYnAtom);

    const handlePreviousClick = () => {
        receptionStep('Step2');
    };

    const handleNextClick = () => {
        if(haveConsult === 'Y'){
            receptionStep('Step4');
        }else{
            receptionStep('Step5');
        }
    };

    const [haveConsult, setHaveConsult] = useState<string>("N");

    useEffect(()=>{
        if(haveConsult === 'Y'){
            haveConsultYn(true);
        }else{
            haveConsultYn(false);
        }
    },[haveConsult])
    
    return (
        <>
            <Typography>
                <Title level={5}>
                    <blockquote>
                        증상에 대해 자세히 알려주시면 수의사님께서 보다 정확한
                        상담을 해주실 수 있어요!
                    </blockquote>
                </Title>
            </Typography>

            <Divider />

            <div>
                <Typography.Title level={5}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    어디가 아파서 오셨나요?
                </Typography.Title>
                <Input.TextArea
                    placeholder="증상에 대해 상사히 입력해 주세요."
                    style={{
                        height: 120,
                        width: '100%',
                        resize: 'none',
                    }}
                />

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    언제부터 아팠나요?
                </Typography.Title>
                <Input.TextArea
                    placeholder="시점에 대해 상사히 입력해 주세요."
                    style={{
                        height: 120,
                        width: '100%',
                        resize: 'none',
                    }}
                />

                <Typography.Title level={5} style={{ marginTop: '2rem' }}>
                    <img src={foot} style={{width: 23, marginRight: 5}}/>
                    이 증상과 관련해서 다른 병원에서 진료 받은적이 있나요?
                    <br/>
                    <Text type="secondary">
                        (아니오를 선택하시면 step5로 넘어갑니다.)
                    </Text>
                </Typography.Title>
                <Radio.Group
                    defaultValue={'N'}
                    onChange={(e) => setHaveConsult(e.target.value)}
                    value={haveConsult}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Radio value={'Y'}>예</Radio>
                    <Radio value={'N'}>아니오</Radio>
                </Radio.Group>
            </div>
            <Divider/>
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

export default SurveyOne;
