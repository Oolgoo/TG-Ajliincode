import { Button, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { ROUTE_LOGIN } from 'routes/const';

export const FindIdByMail = () => {
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
                        <span style={{ fontSize: '1.3em' }}>회원님의 본인인증 정보로 검색된 아이디입니다.</span>
                    </Col>
                </Row>
                <Row style={{marginTop: '2rem'}}>
                    <Col span={4}/>
                    <Col span={6}>
                        <span style={{ fontSize: '1.3em', fontWeight: 600 }}>tg</span>
                    </Col>
                    <Col span={10}>
                        <span style={{ fontSize: '1.2em' }}>2023-05-22 생성</span>
                    </Col>
                    <Col span={4}/>
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