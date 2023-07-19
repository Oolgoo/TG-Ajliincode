import React from 'react';
import { Modal, ModalProps, Progress, message } from 'antd';
import Agreement from '../pages/agree/Agreement';
import { askModalCnAtom, askModalTtlAtom, askStepAtom } from '../recoils/askRecoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import ResultInfo from '../pages/result/ResultInfo';
import Title from 'antd/es/typography/Title';
import PetSelectContainer from './addModal/step1/PetSelectContainer';
import PetNameContainer from './addModal/step2/PetNameContainer';
import PetTypeContainer from './addModal/step3/PetTypeContainer';
import PetGenderContainer from './addModal/step4/PetGenderContainer';
import PetAgeContainer from './addModal/step5/PetAgeContainer';
import ConsultSelectContainer from './addModal/step6/ConsultSelectContainer';
import { petNewYn, petSelectDataAtom, petSelectSymptAtom } from 'common/components/PetMng/petRercoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PetRegistParams } from 'common/components/PetMng/types';
import { PageLoader, registPetFn, userDataAtom } from 'common';
import { AskRegistParams } from '../types';
import { registAskFn } from '../apis';
import { AskPetSymptom } from './addModal/step7/AskPetSymptom';

interface AskModalProps extends ModalProps {
    closeModal: () => void;
}

const AskModalContainer = (props: AskModalProps) => {
    const { open, closeModal } = props;

    const queryClient = useQueryClient();

    //질문할 동물 전체 정보
    const [petSelect, setPetSelect] = useRecoilState(petSelectDataAtom);
    //새로운 동물 여부
    const [newPetAddYn,] = useRecoilState(petNewYn);

    //선택 증상
    const [symptSelect, setSymptSelect] = useRecoilState(petSelectSymptAtom);

    //로그인중인 유저 정보
    const [userData,] = useRecoilState(userDataAtom);

    //질문 제목
    const [symptTtl,] = useRecoilState(askModalTtlAtom);
    //질문 내용
    const [symptCn,] = useRecoilState(askModalCnAtom);

    const askStep = useRecoilValue(askStepAtom);

    const handleClose = () => {
        //모달 닫을때 초기화
        setPetSelect(undefined);
        setSymptSelect(undefined);
        closeModal();
    }

    const regAsk = () => {
        //새 동물데이터 등록시
        if (newPetAddYn) {
            if (petSelect) {
                registPet({
                    params: petSelect
                });
            }
        } else {
            //질문 등록
            if (petSelect?.petNo) {
                const addAskParams = {
                    params: {
                        petNo: petSelect?.petNo,
                        qustnTtl: symptTtl ? symptTtl : '새제목',
                        sympTypCd: symptSelect ? symptSelect : '01',
                        sympKeywd: symptTtl,
                        sympDtlCn: symptCn,
                        delYn: "N"
                    },
                    files: undefined,
                }
                registAsk(addAskParams);
            }
        }
    }

    const { mutate: registPet, isLoading: petLoading } = useMutation(
        (params: PetRegistParams) => registPetFn(params),
        {
            onSuccess: (data: any) => {
                const addAskParams = {
                    params: {
                        petNo: data?.value?.petNo,
                        qustnTtl: symptTtl ? symptTtl : '새제목',
                        sympTypCd: symptSelect ? symptSelect : '01',
                        sympKeywd: symptTtl,
                        sympDtlCn: symptCn,
                        delYn: "N"
                    },
                    files: undefined,
                }
                registAsk(addAskParams);
            },
            onError: (error: any) => {
                if (Array.isArray((error as any).response.data.error)) {
                    (error as any).response.data.error.forEach((el: any) =>
                        message.error(el.message)
                    );
                } else {
                    message.error((error as any).response.data.message);
                }
            },
        }
    );

    const { mutate: registAsk, isLoading: askLoading} = useMutation(
        (params: AskRegistParams) => registAskFn(params),
        {
            onSuccess: () => {
                handleClose();
                queryClient.invalidateQueries({ queryKey: ['getRecAsk', 'getAskAll'] });
            },
            onError: (error: any) => {
                if (Array.isArray((error as any).response.data.error)) {
                    (error as any).response.data.error.forEach((el: any) =>
                        message.error(el.message)
                    );
                } else {
                    message.error((error as any).response.data.message);
                }
            },
        }
    );

    if(askLoading || petLoading){
        return <PageLoader />;
    }

    return (
        <>
            <Modal
                centered
                open={open}
                onCancel={() => handleClose()}
                maskClosable={false}
                closable
                destroyOnClose
                footer={false}
                style={{
                    minWidth: 520
                }}
            >
                {askStep !== 'Agree' && askStep !== 'Result' && (
                    <>
                        <Title level={3} style={{
                            marginTop: 0
                        }}>
                            {askStep}
                        </Title>

                        <Progress
                            percent={
                                askStep === 'Step1' ? 14 :
                                    askStep === 'Step2' ? 28 :
                                        askStep === 'Step3' ? 42 :
                                            askStep === 'Step4' ? 56 :
                                                askStep === 'Step5' ? 70 :
                                                    askStep === 'Step6' ? 84 :
                                                        100
                            }
                            format={
                                () =>
                                    askStep === 'Step1' ? '1 of 7' :
                                        askStep === 'Step2' ? '2 of 7' :
                                            askStep === 'Step3' ? '3 of 7' :
                                                askStep === 'Step4' ? '4 of 7' :
                                                    askStep === 'Step5' ? '5 of 7' :
                                                        askStep === 'Step6' ? '6 of 7' :
                                                            '7 of 7'
                            }
                            strokeLinecap="butt"
                            strokeColor="#F7A95B"
                            style={{
                                width: '97%'
                            }}
                        />
                    </>
                )
                }

                {/* 안내 */}
                {askStep === 'Agree' && <Agreement />}

                {/* 반려동물 선택 시 Step6로 이동 */}
                {askStep === 'Step1' && <PetSelectContainer />}

                {/* 반려동물 신규 추가 */}
                {askStep === 'Step2' && <PetNameContainer />}
                {askStep === 'Step3' && <PetTypeContainer />}
                {askStep === 'Step4' && <PetGenderContainer />}
                {askStep === 'Step5' && <PetAgeContainer />}

                {/* 상담종류 선택 */}
                {askStep === 'Step6' && <ConsultSelectContainer />}
                {askStep === 'Step7' &&
                    <AskPetSymptom
                        handleFinish={() => regAsk()}
                    />
                }

                {askStep === 'Result' && <ResultInfo />}

            </Modal>

        </>
    );
};

export default AskModalContainer;