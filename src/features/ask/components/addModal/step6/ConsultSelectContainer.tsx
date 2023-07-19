import React from 'react';
import ConsultSelect from 'common/components/ConsultSelect/ConsultSelect';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { askStepAtom } from 'features/ask/recoils';
import { petNewYn } from 'common/components/PetMng/petRercoil';

const ConsultSelectContainer = () => {
    const askStep = useSetRecoilState(askStepAtom);

    //새로운 동물 여부
    const [newPetAddYn,] = useRecoilState(petNewYn);

    const handlePreviousClick = () => {
        if (newPetAddYn) {
            askStep('Step5');
        } else {
            askStep('Step1');
        }
    };

    const handleNextClick = () => {
        askStep('Step7');
    };

    return (
        <ConsultSelect
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
    );
};

export default ConsultSelectContainer;