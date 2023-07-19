import React from 'react';
import logo from '../../../../assets/img/logo/logoR.png';
import { Button, Divider, Typography } from 'antd';
import { useSetRecoilState } from 'recoil';
import { askModalAtom } from '../../recoils';

const ResultInfo = () => {

    const setAskModal = useSetRecoilState(askModalAtom);

    const handleOkClick = () => {
        setAskModal(false)
    };
    
    return (
        <>

            <div
                style={{
                    textAlign: 'center',
                    marginTop: 10,
                }}
            >
                <img src={logo} height="180" alt="react-logo" />
            </div>

            <Typography.Title level={3} style={{ marginTop: 10, textAlign: 'center' }}>
                문의 내용이 등록 되었습니다!<br/>
                수의사님께서 곧 답변을 주실거에요!
            </Typography.Title>

            <Divider />

            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Button
                    size='large'
                    type="primary"
                    style={{
                        borderRadius: 5,
                        width: 300,
                        color: 'black'
                    }}
                    onClick={handleOkClick}
                >
                    <span>확인</span>
                </Button>
            </div>
            
        </>
    );
};

export default ResultInfo;