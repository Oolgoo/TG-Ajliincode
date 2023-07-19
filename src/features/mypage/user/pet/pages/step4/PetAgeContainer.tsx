import React from 'react';
import { useSetRecoilState } from 'recoil';
import PetAge from 'common/components/PetMng/PetAge/PetAge';
import { petModalAtom, petStepAtom } from '../../recoils';

const PetAgeContainer = () => {
    const petStep = useSetRecoilState(petStepAtom);
    
    const setPetModal = useSetRecoilState(petModalAtom);

    const handlePreviousClick = () => {
        petStep('Step3');
    };

    const handleNextClick = () => {
        petStep('Step6');
    };

    const handleSaveClick = () => {
        setPetModal(false);
    }; 
    
    return (
        <PetAge
            stepAtom={petStepAtom} 
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
            handleSaveClick={handleSaveClick}
        />
    );
};

export default PetAgeContainer;