import React from 'react';
import { MainContentHeader } from '../../../../../common';
import { Button, Card, Row, Image } from 'antd';
import { PlusSquareOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PetContainer from './PetModalContainer';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { petModalAtom, petStepAtom } from '../recoils';
import { data } from 'common/components/PetMng/PetSelect/Data';

const UserPet = () => {
    const content = `나의 반려동물에 대한 정보를 관리할 수 있어요~`;

    const setPetStep = useSetRecoilState(petStepAtom);

    const [petModal, setPetModal] = useRecoilState(petModalAtom);

    const petList = () => {
        const pet = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                pet.push(
                    <Card style={{ width: '32%', marginBottom: 10, height: '14rem', borderRadius: 10, marginLeft: '1%' }}>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div style={{ width: '35%', textAlign: 'center' }}>
                                <Image
                                    src={data[i].userAvatar}
                                    style={{
                                        borderRadius: 10,
                                        height: '9rem',
                                        width: '7rem',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div
                                    style={{
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        borderRadius: 5,
                                        backgroundColor: '#FBE7A2',
                                        color: '#23180C',
                                        fontWeight: 600,
                                        position: 'absolute',
                                        bottom: 15,
                                        width: '30%',
                                        textAlign: 'center'
                                    }}
                                >
                                    {data[i].petName}
                                </div>
                            </div>
                            <div style={{ width: '60%' }}>
                                <div style={{ display: 'flex', justifyContent: 'right' }}>
                                    <Button
                                        type='text'
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setPetStep('Step1');
                                            setPetModal(true);
                                        }}
                                    />
                                    <Button
                                        type='text'
                                        icon={<DeleteOutlined />}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                                    <span>견종 : </span>
                                    <span>{data[i].petType}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                                    <span>성별 : </span>
                                    <span>{data[i].petGender}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                                    <span>나이 : </span>
                                    <span>{data[i].petAge}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                                    <span>중성화여부 : </span>
                                    <span>{data[i].neuteredYn}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            }
            return (pet);
        }
    }

    return (
        <>
            <MainContentHeader title={`My 반려동물`} content={content} />

            <div
                style={{
                    borderBottom: '1px solid #666',
                    margin: '15px 0 15px 0',
                }}
            ></div>

            <div>
                <Row style={{ display: 'flex', justifyContent: 'start' }}>
                    {petList()}
                    <Card
                        style={{
                            cursor: 'pointer',
                            width: '32%',
                            textAlign: 'center',
                            height: '14rem',
                            borderRadius: 10,
                            marginLeft: '1%'
                        }}
                        onClick={() => {
                            setPetStep('Step1');
                            setPetModal(true);
                        }}
                    >
                        <PlusSquareOutlined style={{ fontSize: '2rem', color: '#F7A95B', marginTop: '4rem' }} />
                    </Card>
                </Row>
            </div>

            {petModal && (
                <PetContainer
                    closeModal={() => setPetModal(false)}
                    open={petModal}
                />
            )}
        </>
    );
};

export default UserPet;
