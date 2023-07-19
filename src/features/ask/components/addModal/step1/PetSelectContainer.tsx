import React from 'react';
import PetSelect from 'common/components/PetMng/PetSelect/PetSelect';
import { useSetRecoilState } from 'recoil';
import { askStepAtom } from 'features/ask/recoils';
import { getMyPetListFn } from 'common';
import { useQuery } from '@tanstack/react-query';

const PetSelectContainer = () => {
    const askStep = useSetRecoilState(askStepAtom);

    const handleNextClick = () => {
        askStep('Step6');
    };

    const handleNewClick = () => {
        askStep('Step2');
    };

    // React Query 상세 조회
    const { data } = useQuery([
        'getMyPetList'], () => getMyPetListFn(), {
        retry: 1
    });

    return (
        <PetSelect
            handleNextClick={handleNextClick}
            handleNewClick={handleNewClick}
            petData={data}
        />
    );
};

export default PetSelectContainer;