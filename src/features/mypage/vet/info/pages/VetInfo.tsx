import { MainContentHeader } from 'common';
import CheckPassword from 'features/mypage/user/info/pages/Check/CheckPassword';
import React, { useState } from 'react';
import VetInfoUpdate from './VetInfoUpdate';

const VetInfo = () => {
    const [checkYn , setCheckYn] = useState<boolean>(false);
    return (
        <>
            <MainContentHeader title={`계정정보`} content={''} />

            {!checkYn ? (
                <CheckPassword
                    checkYn={() => setCheckYn(true)}
                />
            ) : (
                <VetInfoUpdate />
            )

            }
        </>
    );
};

export default VetInfo;