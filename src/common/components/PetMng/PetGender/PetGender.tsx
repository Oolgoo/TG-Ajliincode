import React, { useState } from 'react';
import { Button, Divider, Radio, Space, Typography } from 'antd';
import foot from 'assets/img/foot.png';
import { useRecoilState } from 'recoil';
import { petSelectDataAtom } from '../petRercoil';

interface IProps {
    handleNextClick: () => void;
    handlePreviousClick: () => void;
}

const PetGender: React.FC<IProps> = ({
    handleNextClick,
    handlePreviousClick,
}) => {

    //질문할 동물 전체 정보
    const [petSelect, setPetSelect] = useRecoilState(petSelectDataAtom);

    const [selectGnd, setSelectGnd] = useState<string>('MALE');
    const [neutYn, setNeutYn] = useState<string>('N');

    const clickNext = () => {
        setPetSelect({
            ...petSelect,
            gndrCd: selectGnd,
            neutYn: neutYn
        })

        handleNextClick();
    }

    return (
        <>
            <Typography.Title level={5}>
                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                성별이 무엇인가요?
            </Typography.Title>

            <Radio.Group
                defaultValue='MALE'
                buttonStyle="solid"
                style={{
                    marginTop: '1rem',
                }}
                onChange={e => setSelectGnd(e.target.value)}
            >
                <Radio.Button value='MALE'>남</Radio.Button>
                <Radio.Button value='FEMALE'>여</Radio.Button>
                <Radio.Button value="UNKNOWN">미확인</Radio.Button>
            </Radio.Group>

            <Divider />

            <Typography.Title level={5}>
                <img src={foot} style={{ width: 23, marginRight: 5 }} />
                중성화는 했나요?
            </Typography.Title>

            <Radio.Group
                defaultValue="N"
                buttonStyle="solid"
                style={{
                    marginTop: '1rem',
                }}
                onChange={e=> setNeutYn(e.target.value)}
            >
                <Radio.Button value="N">중성화 안했어요</Radio.Button>
                <Radio.Button value="Y">중성화 했어요</Radio.Button>
            </Radio.Group>

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

export default PetGender;
