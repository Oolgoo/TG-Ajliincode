import React from 'react';
import { Modal, ModalProps, Progress } from 'antd';
import Agreement from './agree/Agreement';
import { useRecoilValue} from 'recoil';
import { receptionStepAtom } from '../recoils/receptionRecoil';
import SurveyOne from './step3/SurveyOne';
import SurveyTwo from './step4/SurveyTwo';
import SurveyThree from './step5/SurveyThree';
import VetSelect from './step6/VetSelect';
import ScheduleSelect from './step7/ScheduleSelect';
import ResultInfo from './result/ResultInfo';
import PetSelectContainer from './step1/PetSelectContainer';
import ConsultSelectContainer from './step2/ConsultSelectContainer';
import Title from 'antd/es/typography/Title';
import PetSymptom from './step8/PetSymptom';

interface ReceptionModalProps extends ModalProps {
    closeModal: () => void;
}

const ReceptionCreate = (props: ReceptionModalProps) => {
    const { open, closeModal } = props;

    const receptionStep = useRecoilValue(receptionStepAtom);

    const handleOkClick = () => {
        //setShowStep(false)
    };

    return (
        <>
            <Modal
                centered
                open={open}
                onOk={handleOkClick}
                onCancel={closeModal}
                maskClosable={false}
                closable
                destroyOnClose
                footer={false}
                style={{
                    minWidth: 520  
                }}
            >
                
                { receptionStep !== 'Agree' && receptionStep !== 'Result' && (
                    <>
                        <Title level={3} style={{
                            marginTop: 0
                        }}>
                            {receptionStep}
                        </Title>
                        
                        <Progress 
                            percent={
                                receptionStep === 'Step1' ? 12.5 : 
                                receptionStep === 'Step2' ? 25 : 
                                receptionStep === 'Step3' ? 37.5 : 
                                receptionStep === 'Step4' ? 50 :
                                receptionStep === 'Step5' ? 62.5 :
                                receptionStep === 'Step6' ? 75 :
                                receptionStep === 'Step7' ? 87.5 :
                                100 
                            } 
                            format={
                                ()=> 
                                receptionStep === 'Step1' ? '1 of 8' : 
                                receptionStep === 'Step2' ? '2 of 8' : 
                                receptionStep === 'Step3' ? '3 of 8' : 
                                receptionStep === 'Step4' ? '4 of 8' :
                                receptionStep === 'Step5' ? '5 of 8' :
                                receptionStep === 'Step6' ? '6 of 8' :
                                receptionStep === 'Step7' ? '7 of 8' :
                                '8 of 8'
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
                {receptionStep === 'Agree' && <Agreement />}

                {receptionStep === 'Step1' && <PetSelectContainer />}
                
                {receptionStep === 'Step2' && <ConsultSelectContainer />}

                {receptionStep === 'Step3' && <SurveyOne />}
                {receptionStep === 'Step4' && <SurveyTwo />}
                {receptionStep === 'Step5' && <SurveyThree />}
                
                {receptionStep === 'Step6' && <VetSelect />}
                
                {receptionStep === 'Step7' && <ScheduleSelect />}

                {receptionStep === 'Step8' && <PetSymptom />}

                {receptionStep === 'Result' && <ResultInfo />}
            </Modal>
        </>
    );
};

export default ReceptionCreate;
