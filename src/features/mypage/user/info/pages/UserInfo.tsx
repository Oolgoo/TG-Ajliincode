import React, { useState } from 'react';
import { MainContentHeader } from 'common';
import UserInfoUpdate from './UserInfoUpdate';
import CheckPassword from './Check/CheckPassword';

const UserInfo = () => {
    const [checkYn , setCheckYn] = useState<boolean>(false);

    return (
        <>
            <MainContentHeader title={`계정정보`} content={''} />

            {!checkYn ? (
                <CheckPassword 
                    checkYn={()=> setCheckYn(true)}
                />
                ) : (
                    <UserInfoUpdate />
                )

            }
        </>
    );
};

export default UserInfo;