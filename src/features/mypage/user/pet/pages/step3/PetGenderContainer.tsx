import React from 'react';
import PetGender from 'common/components/PetMng/PetGender/PetGender';
import { useSetRecoilState } from 'recoil';
import { petStepAtom } from '../../recoils';

const PetGenderContainer = () => {
    const petStep = useSetRecoilState(petStepAtom);

    const handlePreviousClick = () => {
        petStep('Step2');
    };

    const handleNextClick = () => {
        petStep('Step4');
    };
    
    return (
        <PetGender
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
    );
};

export default PetGenderContainer;