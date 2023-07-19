import React from 'react';
import { useSetRecoilState } from 'recoil';
import PetAge from 'common/components/PetMng/PetAge/PetAge';
import { askStepAtom } from 'features/ask/recoils';

const PetAgeContainer = () => {
    const askStep = useSetRecoilState(askStepAtom);

    const handlePreviousClick = () => {
        askStep('Step4');
    };

    const handleNextClick = () => {
        askStep('Step6');
    };

    const handleSaveClick = () => {
        //사용안함
    }; 
    
    return (
        <PetAge 
            stepAtom={askStepAtom} 
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
            handleSaveClick={handleSaveClick}
        />
    );
};

export default PetAgeContainer;