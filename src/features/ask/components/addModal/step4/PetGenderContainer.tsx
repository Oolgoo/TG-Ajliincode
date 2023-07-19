import React from 'react';
import PetGender from 'common/components/PetMng/PetGender/PetGender';
import { useSetRecoilState } from 'recoil';
import { askStepAtom } from 'features/ask/recoils';

const PetGenderContainer = () => {
    const askStep = useSetRecoilState(askStepAtom);

    const handlePreviousClick = () => {
        askStep('Step3');
    };

    const handleNextClick = () => {
        askStep('Step5');
    };
    
    return (
        <PetGender
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
        />
    );
};

export default PetGenderContainer;