import React from 'react';
import { useSetRecoilState } from 'recoil';
import { askStepAtom } from 'features/ask/recoils';
import { PetName } from 'common';

const PetNameContainer = () => {
    const askStep = useSetRecoilState(askStepAtom);

    const handlePreviousClick = () => {
        askStep('Step1');
    };

    const handleNextClick = () => {
        askStep('Step3');
    };

    return (
        <PetName
            stepAtom={askStepAtom} 
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
    );
};

export default PetNameContainer;