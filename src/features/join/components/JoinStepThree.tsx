import { Button } from 'antd';
import React from 'react';
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from 'routes/const';

export const JoinStepThree = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
                <div
                    style={{
                        textAlign: 'center',
                        backgroundColor: '#f7f7f7',
                        width: '80%',
                        borderRadius: 20,
                        paddingTop: '5rem',
                        display: 'inline-block'
                    }}>
                    <CheckCircleOutlined style={{ fontSize: '5rem', color: '#e9e9e9' }} />
                    <p style={{ fontSize: '1.5em' }}>회원가입이 <strong>완료</strong>되었습니다.</p>
                    <div>
                        <Button
                            block
                            size='large'
                            type="primary"
                            className="btn-round mb-3"
                            htmlType='submit'
                            style={{
                                height: '3em',
                                fontSize: 20,
                                marginTop: '5rem',
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20
                            }}
                            onClick={() => navigate(ROUTE_LOGIN)}
                        >
                            <UserOutlined />
                            로그인 하기
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}