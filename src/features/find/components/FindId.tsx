import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import styled from 'styled-components';
import { FindIdByMailModal } from './FindIdByMailModal';

const StyledDiv = styled(Layout)`
:where(.css-dev-only-do-not-override-ipwls).ant-layout:hover{
    color: #F5C523;
}
`
export const FindId = () => {
    const [sendMail, setSendMail] = useState<boolean>(false);

    return(
        <>
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
                <MailOutlined style={{fontSize: '3rem'}}/>
                <br/>
                <br/>
                <span style={{fontSize: '1.3em'}}>이메일 본인인증</span>
            </StyledDiv>
            {
                sendMail && (
                    <FindIdByMailModal
                        closeModal={() => setSendMail(false)}
                        open={sendMail}
                    />
                )
            }
        </>
    )
}