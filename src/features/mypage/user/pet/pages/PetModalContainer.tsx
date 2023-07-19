import React from 'react';
import { Divider, Modal, ModalProps, Progress, Typography } from 'antd';
import { useRecoilValue } from 'recoil';
import { petStepAtom } from '../recoils';
import PetNameContainer from './step1/PetNameContainer';
import PetTypeContainer from './step2/PetTypeContainer';
import PetGenderContainer from './step3/PetGenderContainer';
import PetAgeContainer from './step4/PetAgeContainer';

interface PetModalProps extends ModalProps {
    closeModal: () => void;
}

const PetModalContainer = (props: PetModalProps) => {
    const { open, closeModal } = props;

    const { Title } = Typography;

    const petStep = useRecoilValue(petStepAtom);

    return (
        <>
            <Modal
                centered
                open={open}
                onCancel={closeModal}
                maskClosable={false}
                closable
                destroyOnClose
                footer={false}
                style={{
                    minWidth: 520  
                }}
            >
                <div>
                    <Title
                        level={3}
                        style={{
                            marginTop: 0,
                        }}
                    >
                        {petStep}
                    </Title>

                    <Progress
                        percent={
                            petStep === 'Step1' ? 25 : 
                            petStep === 'Step2' ? 50 : 
                            petStep === 'Step3' ? 75 : 
                            100 
                        } 
                        format={
                            ()=> 
                            petStep === 'Step1' ? '1 of 4' : 
                            petStep === 'Step2' ? '2 of 4' : 
                            petStep === 'Step3' ? '3 of 4' : 
                            '4 of 4'
                        }
                        strokeLinecap="butt"
                        strokeColor="#F7A95B"
                        style={{
                            width: '97%',
                        }}
                    />
                </div>

                <Divider />

                {petStep === 'Step1' && <PetNameContainer />}
                {petStep === 'Step2' && <PetTypeContainer />}
                {petStep === 'Step3' && <PetGenderContainer />}
                {petStep === 'Step4' && <PetAgeContainer />}
            </Modal>
        </>
    );
};

export default PetModalContainer;
