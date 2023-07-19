import React from 'react';
import ConsultSelect from 'common/components/ConsultSelect/ConsultSelect';
import { useSetRecoilState } from 'recoil';
import { receptionStepAtom } from '../../recoils';

const ConsultSelectContainer = () => {
    const receptionStep = useSetRecoilState(receptionStepAtom);

    const handlePreviousClick = () => {
        receptionStep('Step1');
    };

    const handleNextClick = () => {
        receptionStep('Step3');
    };


    return (
        <ConsultSelect 
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
            
    );
};

export default ConsultSelectContainer;