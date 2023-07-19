import React, { useState } from 'react';
import { Button, Divider, Input, Radio, Select, Space, Typography } from 'antd';
import foot from 'assets/img/foot.png';
import { useRecoilState } from 'recoil';
import { petSelectDataAtom } from '../petRercoil';
import { birdTypes, catTypes, dogTypes, getPetTypeNm } from './petTypes';

interface IProps {
    handleNextClick: () => void;
    handlePreviousClick: () => void;
}

export const PetBred: React.FC<IProps> = ({
    handleNextClick,
    handlePreviousClick,
}) => {
    
    //질문할 동물 전체 정보
    const [petSelect, setPetSelect] = useRecoilState(petSelectDataAtom);

    //동물 종류
    const [petTyp, setPetTyp] = useState<string>('1');
    //동물 품종 (input)
    const [petBred, setPetBred] = useState<string>('');
    //동물 품종 (selector)
    const [selectBred, setSelectBred] = useState<string>('1');

    const clickNext = () => {
        //각 종류중 기타 품종을 선택 혹은 기타 종류 선택시
        if (selectBred === '0' || petTyp==='4') {
            setPetSelect({
                ...petSelect,
                typCd: petTyp,
                bred: petBred
            });
        } else {
            setPetSelect({
                ...petSelect,
                typCd: petTyp,
                bred: getPetTypeNm(petTyp,selectBred)
            });
            
        }

        handleNextClick();
    }

    return (
        <>
            <Typography.Title level={5}>
                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                어떤 친구인가요?
            </Typography.Title>

            <Radio.Group
                defaultValue="1"
                buttonStyle="solid"
                style={{ marginTop: '1rem' }}
                onChange={e => setPetTyp(e.target.value)}
            >
                <Radio.Button value="1">강아지</Radio.Button>
                <Radio.Button value="2">고양이</Radio.Button>
                <Radio.Button value="3">새</Radio.Button>
                <Radio.Button value="4">기타</Radio.Button>
            </Radio.Group>

            <div style={{ width: '100%', display: 'flex', marginTop: '1rem' }}>
                <Select
                    disabled={petTyp === '4'}
                    defaultValue="1"
                    style={{ width: '30%', marginRight: '5%' }}
                    onChange={e => setSelectBred(e)}
                    options={petTyp === '1' ? dogTypes : petTyp === '2' ? catTypes : birdTypes}
                />
                <Input
                    disabled={(petTyp!='4'&&selectBred !== '0')}
                    placeholder="기타 품종을 입력해 주세요."
                    style={{ width: '60%' }}
                    onChange={e => setPetBred(e.target.value)}
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
                        size="large"
                        style={{
                            borderRadius: 5,
                            width: 150,
                        }}
                        onClick={handlePreviousClick}
                    >
                        <span>이전</span>
                    </Button>

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