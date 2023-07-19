import { Button, Divider, Input, Space, Typography, message } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import styled from 'styled-components';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { askModalCnAtom, askModalTtlAtom, askStepAtom } from 'features/ask/recoils';

const StyledDragger = styled(Dragger)`
    .ant-upload-list-item-container {
        float: left;
        width: 180;
        margin-inline-end: 8px;
    }
`;

interface AskPetSymptomProps{
    handleFinish:() => void;
}

export const AskPetSymptom = (props: AskPetSymptomProps) => {
    const {handleFinish } = props;

    const [symptTtl, setSymptTtl] = useRecoilState(askModalTtlAtom);
    const [symptCn, setSymptCn] = useRecoilState(askModalCnAtom);
    
    const askStep = useSetRecoilState(askStepAtom);
    
    const handlePreviousClick = () => {
        askStep('Step6');
    };

    const handleNextClick = () => {
        handleFinish();
    };

    const clickNext =() =>{
        if(symptTtl=='' || !symptTtl){
            message.error('제목을 입력해주세요.');
            return;
        }else{
            handleNextClick();
        }
    }

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
                <Input
                    placeholder="질문할 내용의 제목을 입력해주세요."
                    style={{
                        //height: 120,
                        width: '100%',
                        //resize: 'none',
                    }}
                    onChange={e=> setSymptTtl(e.target.value)}
                />
                <Input.TextArea
                    placeholder="궁금한 점에 대해 상세히 입력해 주세요."
                    style={{
                        height: 150,
                        width: '100%',
                        resize: 'none',
                        marginTop: 10
                    }}
                    onChange={e=> setSymptCn(e.target.value)}
                />
                <div
                    style={{
                        marginTop: 10,
                        width: '100%'
                    }}
                >
                    <StyledDragger
                        multiple={true}
                        maxCount={10}
                        listType={'picture'}
                        showUploadList={true}
                        beforeUpload={() => false}
                        fileList={[]}
                        defaultFileList={[]}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p
                            className="ant-upload-text"
                            style={{ paddingBottom: 20 }}
                        >
                            여러 개의 파일을 마우스로 끌어놓으세요.
                        </p>
                    </StyledDragger>
                </div>
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
                            color: 'black'
                        }}
                        onClick={()=> clickNext()}
                    >
                        <span>다음</span>
                    </Button>
                </Space>
            </div>
        </>
    );
};
