import React from 'react';
import { useSetRecoilState } from 'recoil';
import { petStepAtom } from '../../recoils';
import { PetName } from 'common';

const PetNameContainer = () => {
    const petStep = useSetRecoilState(petStepAtom);

    const handlePreviousClick = () => {
        petStep('Step2');
    };

    const handleNextClick = () => {
        petStep('Step2');
    };

    return (
        <PetName
            stepAtom={petStepAtom}  
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
    );
};

export default PetNameContainer;