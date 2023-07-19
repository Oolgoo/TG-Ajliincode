import React from 'react';
import { useSetRecoilState } from 'recoil';
import { petStepAtom } from '../../recoils';
import { PetBred } from 'common';

const PetTypeContainer = () => {
    const petStep = useSetRecoilState(petStepAtom);

    const handlePreviousClick = () => {
        petStep('Step1');
    };

    const handleNextClick = () => {
        petStep('Step3');
    };
    
    return (
        <PetBred
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
    );
};

export default PetTypeContainer;