import React, { useState } from 'react';
import { Button, Divider, Input, Space, Typography, message } from 'antd';
import { RecoilState, useRecoilState } from 'recoil';
import foot from 'assets/img/foot.png';
import { petSelectDataAtom } from '../petRercoil';

interface IProps {
    stepAtom: RecoilState<string>;
    handleNextClick: () => void;
    handlePreviousClick: () => void;
}

export const PetName: React.FC<IProps> = ({
    stepAtom,
    handleNextClick,
    handlePreviousClick,
}) => {

    const [petSelect, setPetSelect] = useRecoilState(petSelectDataAtom);

    const [petName, setPetName] = useState<string>('');

    const clickNext = () => {
        if (!petName || petName == "") {
            message.error('이름을 설정해주세요.');
            return;
        } else {
            setPetSelect({
                ...petSelect,
                petNm: petName
            });
            handleNextClick();
        }
    }

    return (
        <>
            <Typography.Title level={5}>
                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                이름이 무엇인가요?
            </Typography.Title>

            <Input
                placeholder="이름을 등록해주세요"
                showCount
                maxLength={25}
                style={{
                    width: '100%',
                    marginTop: '1rem',
                }}
                
                onChange={e => setPetName(e.target.value)}
            />

            <Divider />

            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Space wrap>
                    {stepAtom.key === 'askStepAtom' && (
                        <Button
                            size="large"
                            style={{
                                borderRadius: 5,
                                width: 150,
                            }}
                            onClick={handlePreviousClick}
                        >
                            <span>이전</span>
                        </Button>
                    )}

                    <Button
                        size="large"
                        type="primary"
                        block
                        style={{
                            borderRadius: 5,
                            width: 300,
                            color: 'black',
                        }}
                        onClick={() => clickNext()}
                    >
                        <span>다음</span>
                    </Button>
                </Space>
            </div>
        </>
    );
};