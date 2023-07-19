import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FindId, FindIdByMail, FindPw, FindPwByMailStepOne, FindPwByMailStepTwo } from '../components';
import { useRecoilState } from 'recoil';
import { findStateAtom } from '../recoils/FindAccountRecoils';

const StyledButton = styled(Button)`
:where(.css-dev-only-do-not-override-ipwls).ant-btn:hover{
    color: #F5C523;
}
`
const FindAccountContainer = () => {
    const [findState, setFindState] = useRecoilState<string>(findStateAtom);

    return (
        <>
            <div className={'section-division'}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem'
                }}
            >
                <div style={{
                    width: '40rem',
                }}
                >
                    <p style={{ fontSize: '2em', fontWeight: 600 }}>아이디/비밀번호 찾기</p>
                    <hr />
                    <div style={{display:'flex'}}>
                        <StyledButton
                            type='text'
                            style={{
                                fontSize: '1.5em',
                                height: '3rem',
                                color: findState === 'id' || findState === 'idByMail' ? '#F5C523' : ''
                            }}
                            onClick={() => setFindState('id')}
                            >
                            아이디 찾기
                        </StyledButton>
                        <StyledButton 
                            type='text'
                            style={{
                                fontSize: '1.5em',
                                height: '3rem',
                                color: findState === 'pw' || findState === 'pwByMail' ? '#F5C523' : ''
                            }}
                            onClick={() => setFindState('pw')}
                            >
                            비밀번호 찾기
                        </StyledButton>
                    </div>
                    {findState === 'id' && <FindId/>}
                    {findState === 'idByMail' && <FindIdByMail/>}
                    {findState === 'pw' && <FindPw/>}
                    {findState === 'pwByMailOne' && <FindPwByMailStepOne/>}
                    {findState === 'pwByMailTwo' && <FindPwByMailStepTwo/>}
                </div>
            </div>
        </>
    )
}
export default FindAccountContainer;