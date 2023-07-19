import React from 'react';
import { KeyOutlined } from '@ant-design/icons';
import { Button, Divider, Form } from 'antd';
import Input from 'antd/es/input/Input';

interface CheckPasswordProps {
    checkYn: () => void;
}

const CheckPassword = (props: CheckPasswordProps) => {
    const { checkYn } = props;

    const onFinish = () => {
        checkYn();
    }
    
    return (
        <div style={{ width: '100%', textAlign: 'center', borderTop: 'solid 1px #747474' }}>
            <div style={{ margin: '3rem' }}>
                <h3>비밀번호 확인</h3>
                <span>
                    회원님의 정보를 안전하게 보호하기 위해 계정을 다시 한 번
                    확인합니다.
                </span>
            </div>
            <Divider />
            <Form
            //onKeyPress={onCheckEnter}
            onFinish={onFinish}
            >
                <Form.Item style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                    <Form.Item name="pswd">
                        <Input
                            size="large"
                            style={{ width: '25rem', marginBottom: 20 }}
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            autoFocus={true}
                            prefix={<KeyOutlined />}
                        />
                    </Form.Item>
                    <Button type="primary" size="large" htmlType="submit" style={{color: 'black'}}>
                        확인
                    </Button>
                </Form.Item>
            </Form>
            <div
                style={{
                    backgroundColor: '#f8f8f8',
                    padding: '1rem',
                    borderTop: '1px solid #bdbdbd',
                }}
            >
                <p>회원님의 개인정보를 신중히 취급하며, 회원님의 동의 없이는</p>
                <p>기재하신 회원정보를 공개 및 변경하지 않습니다.</p>
            </div>
        </div>
    );
};

export default CheckPassword;