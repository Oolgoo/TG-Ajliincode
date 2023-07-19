import React, { useState } from 'react';
import { Button, DatePicker, Divider, InputNumber, Space, Typography } from 'antd';
import { RecoilState, useRecoilState } from 'recoil';
import foot from 'assets/img/foot.png';
import { petSelectDataAtom } from '../petRercoil';

interface IProps {
    stepAtom: RecoilState<string>;
    handleNextClick: () => void;
    handlePreviousClick: () => void;
    handleSaveClick: () => void;
}

const PetAge: React.FC<IProps> = ({
    stepAtom,
    handleNextClick,
    handlePreviousClick,
    handleSaveClick
}) => {

    //질문할 동물 전체 정보
    const [petSelect, setPetSelect] = useRecoilState(petSelectDataAtom);
    
    const [petAge, setPetAge] = useState<number | null>(0);
    const [petWght, setPetWght] = useState<number | null>(0);
    const [petBirth, setPetBirth] = useState<string|undefined>('');

    const clickNext = () => {
        
        setPetSelect({
            ...petSelect,
            age : petAge ? petAge : undefined,
            birthDay : petBirth!=='' ? petBirth : undefined,
            wght: petWght? petWght+"" : undefined
        })

        handleNextClick();
    }

    return (
        <div>
            <Typography.Title level={5}>
                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                몸무게가 어떻게 되나요?
            </Typography.Title>

            <InputNumber
                autoFocus={true}
                defaultValue={0}
                onChange={e =>setPetWght(e)}
                min={0}
            />(kg)

            <Typography.Title level={5}>
                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                나이가 어떻게 되나요?
            </Typography.Title>

            <InputNumber
                defaultValue={0}
                onChange={e => setPetAge(e)}
                min={0}
            />
            <Typography.Title level={5}>
                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                생일을 설정해주세요.
            </Typography.Title>
            <DatePicker
                inputReadOnly={true}
                showToday={false}
                style={{
                    //border
                    //width: '18rem',
                    borderRadius: 5,
                    marginTop: '1rem',
                }}
                format={'YYYY-MM-DD'}
            //value={startDate ? dayjs(startDate, 'YYYY-MM-DD') : null}
            onChange={(date) => setPetBirth(date?.format('YYYYMMDD'))}
            />

            <Divider />

            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Space wrap>
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

                    {stepAtom.key === 'petStepAtom' ? (
                        <Button
                            size="large"
                            type="primary"
                            style={{
                                borderRadius: 5,
                                width: 300,
                                color: 'black',
                            }}
                            onClick={handleSaveClick}
                        >
                            저장
                        </Button>
                    ) : (
                        <Button
                            size="large"
                            type="primary"
                            style={{
                                borderRadius: 5,
                                width: 300,
                                color: 'black',
                            }}
                            onClick={() => clickNext()}
                        >
                            <span>다음</span>
                        </Button>
                    )}
                </Space>
            </div>
        </div>
    );
};

export default PetAge;
