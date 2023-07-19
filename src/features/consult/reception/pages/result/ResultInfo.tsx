import React from 'react';
import { Button, Descriptions, Divider, Typography } from 'antd';
import logo from '../../../../../assets/img/logo/logoR.png';
import { useSetRecoilState } from 'recoil';
import { receptionModalAtom } from '../../recoils/receptionRecoil';

const ResultInfo = () => {
    const { Text, Paragraph } = Typography;

    const setReceptionModal = useSetRecoilState(receptionModalAtom);

    const handleOkClick = () => {
        setReceptionModal(false)
    };

    return (
        <div>
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 10,
                }}
            >
                <img src={logo} height="180" alt="react-logo" />
            </div>

            <Typography.Title level={3} style={{ marginTop: 10, textAlign: 'center' }}>
                실시간 상담 요청이 접수 되었습니다!

                <Paragraph style={{ marginLeft: 10 }}>
                    <Text type="secondary">
                        수의사님께서 접수 확정 해주시면 알려드릴게요! <br/>
                        (예약 정보는 마이페이지에서 조회 가능해요)
                    </Text>
                </Paragraph>
            </Typography.Title>

            <Divider />

            <Descriptions title='예약정보' bordered>
                <Descriptions.Item label="상담예약일시" span={3}>
                    2023-04-20 12:30
                </Descriptions.Item>
                <Descriptions.Item label="상담 수의사" span={3}>
                    서울동물병원 부용주 수의사
                </Descriptions.Item>
                <Descriptions.Item label="반려동물" span={3}>
                    초코 / 3살 / 여아 / 중성화O
                </Descriptions.Item>
                <Descriptions.Item label="보호자" span={3}>
                    초코엄마
                </Descriptions.Item>
            </Descriptions>

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
                        color: 'black',
                    }}
                    onClick={handleOkClick}
                >
                    <span>확인</span>
                </Button>
            </div>
        </div>
    );
};

export default ResultInfo;
