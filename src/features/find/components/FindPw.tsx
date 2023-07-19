import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Input, Layout } from 'antd';
import styled from 'styled-components';
import { FindPwByMailModal } from './FindPwByMailModal';

const StyledDiv = styled(Layout)`
:where(.css-dev-only-do-not-override-ipwls).ant-layout:hover{
    color: #F5C523;
}
`
export const FindPw = () => {
    const [sendMail, setSendMail] = useState<boolean>(false);

    return (
        <>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                    style={{
                        fontSize: '1.3em',
                        width: '20%',
                        marginLeft: '5%'
                    }}
                >
                    아이디
                    <span style={{ color: '#F7A95B', marginLeft: 10 }}>*</span>
                </span>
                
                <Input
                    style={{
                        width: '70%',
                        height: '2.5rem',
                        borderRadius: 10,
                        marginRight: '5%'
                    }}
                    placeholder='아이디를 입력해주세요.'
                />
            </div>
            <StyledDiv
                style={{
                    alignItems: 'center',
                    backgroundColor: '#f7f7f7',
                    width: '100%',
                    borderRadius: 20,
                    paddingTop: '5rem',
                    paddingBottom: '5rem',
                    marginTop: '2rem',
                    cursor: 'pointer'
                }}
                onClick={() => setSendMail(true)}
            >
                <MailOutlined style={{ fontSize: '3rem' }} />
                <br />
                <br />
                <span style={{ fontSize: '1.3em' }}>이메일 본인인증</span>
            </StyledDiv>
            {
                sendMail && (
                    <FindPwByMailModal
                        closeModal={() => setSendMail(false)}
                        open={sendMail}
                    />
                )
            }
        </>
    )
}