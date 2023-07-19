import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from 'routes/const';

export const FindPwByMailStepTwo = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: '#f7f7f7',
                    width: '100%',
                    borderRadius: 20,
                    paddingTop: '5rem',
                    marginTop: '2rem'
                }}>
                <Row style={{marginTop: '2rem'}}>
                    <Col span={24}>
                        <span style={{ fontSize: '1.3em' }}>비밀번호가 변경되었습니다.</span>
                    </Col>
                </Row>
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
        </>
    )
}