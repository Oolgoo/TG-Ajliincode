import React from 'react';
import { useSetRecoilState } from 'recoil';
import { askStepAtom } from 'features/ask/recoils';
import { PetBred } from 'common';

const PetTypeContainer = () => {
    const askStep = useSetRecoilState(askStepAtom);

    const handlePreviousClick = () => {
        askStep('Step2');
    };

    const handleNextClick = () => {
        askStep('Step4');
    };
    
    return (
        <PetBred
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
    );
};

export default PetTypeContainer;