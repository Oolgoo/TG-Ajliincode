import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Radio, Typography, Image, Row, Tooltip } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import styles from './petSelect.module.scss';
import { useRecoilState } from 'recoil';
import { petNewYn, petSelectDataAtom } from '../petRercoil';

interface IProps {
    handleNextClick: () => void;
    handleNewClick: () => void;
    petData?: any
}

const PetSelect: React.FC<IProps> = ({ handleNextClick, handleNewClick, petData }) => {
    const { Title, Text } = Typography;

    //선택한 동물 데이터
    const [petSelect, setPetSelect] = useRecoilState(petSelectDataAtom);

    //새로운 동물 여부
    const [, setNewPetAddYn] = useRecoilState(petNewYn);

    //Radio 선택 동물 번호
    const [selectPetNum, setSelectPetNum] = useState<number>(0);

    const nextClick = () => {
        const selectPet = petData.find((item:any) => {
            return item.petNo === selectPetNum
        })

         //선택한 동물 정보 atom으로 임시저장
        setPetSelect(selectPet);
        handleNextClick();
        setNewPetAddYn(false);
    }

    const newClick = () => {
        //새로운 동물 선택해서 상담
        handleNewClick();
        setPetSelect(undefined);
        setNewPetAddYn(true);
    }

    useEffect(()=>{
        if(petSelect?.petNo){
            setSelectPetNum(petSelect?.petNo);
        }else{
            setSelectPetNum(0);
        }
    },[petSelect])
    
    return (
        <>
            <Typography>
                <Title level={5}>
                    <blockquote>어떤 친구에 대해 상담하시겠어요?</blockquote>
                </Title>
            </Typography>

            <Divider />

            <div>
                <Typography>
                    <Text type="secondary" style={{ fontWeight: 600 }}>
                        * 동물 이름에 마우스를 올리면 해당 동물의 정보를 볼 수 있어요.
                    </Text>
                </Typography>
                <Radio.Group
                    defaultValue={0}
                    value={selectPetNum}
                    onChange={e => setSelectPetNum(e.target.value)}
                >
                    <Row className={styles.default}>
                        {petData.map((item: any) => {
                            return (
                                <>
                                    <Card className={styles.card}>
                                        <div style={{ marginBottom: 10 }}>
                                            <Image
                                                src={item.userAvatar}
                                                className={styles.cardImage}
                                            />
                                        </div>
                                        <div className={styles.petNm} style={{ cursor: 'pointer' }}>
                                            <Tooltip
                                                title={
                                                    <>
                                                        이름 : {item.petNm}
                                                        <br />
                                                        성별 : {item.gndrCd === 'MALE' ? '수컷' : item.gndrCd === 'FEMALE' ? '암컷' : '알수없음'}
                                                        <br />
                                                        품종 : {item.typCd}
                                                        <br />
                                                        나이 : {item.age}
                                                        <br />
                                                        중성화여부 : {item.neutYn}
                                                    </>
                                                }>
                                                <span>{item.petNm}</span>
                                            </Tooltip>
                                        </div>
                                        <div
                                            style={{
                                                padding: 5,
                                            }}
                                        >
                                            <Radio
                                                value={item?.petNo}
                                                style={{
                                                    margin: '0 auto',
                                                }}
                                            />
                                        </div>
                                    </Card>
                                </>
                            );
                        })}

                        <Card
                            className={styles.card}
                            onClick={() => newClick()}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <PlusSquareOutlined className={styles.icon} />
                        </Card>
                    </Row>
                </Radio.Group>
            </div>

            <Divider />

            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Button
                    type="primary"
                    size="large"
                    style={{
                        borderRadius: 5,
                        width: 300,
                        color: 'black',
                    }}
                    onClick={() => nextClick()}
                >
                    <span>다음</span>
                </Button>
            </div>
        </>
    );
};

export default PetSelect;
