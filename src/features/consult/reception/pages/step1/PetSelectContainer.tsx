import React from 'react';
import PetSelect from 'common/components/PetMng/PetSelect/PetSelect';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { receptionStepAtom } from '../../recoils';
import { petModalAtom, petStepAtom } from 'features/mypage/user/pet';
import PetContainer from 'features/mypage/user/pet/pages/PetModalContainer';

const PetSelectContainer = () => {
    const receptionStep = useSetRecoilState(receptionStepAtom);

    const setPetStep = useSetRecoilState(petStepAtom);

    const [petModal, setPetModal] = useRecoilState(petModalAtom);

    const handleNextClick = () => {
        receptionStep('Step2');
    };

    const handleNewClick = () => {
        setPetStep('Step1');
        setPetModal(true);
    };

    return (
        <>
            <PetSelect
                handleNextClick={handleNextClick}
                handleNewClick={handleNewClick}
            />
            {petModal && (
                <PetContainer
                    closeModal={() => setPetModal(false)}
                    open={petModal}
                />
            )}
        </>
    );
};

export default PetSelectContainer;