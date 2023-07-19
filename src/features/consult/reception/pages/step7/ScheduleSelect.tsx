import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { receptionStepAtom } from '../../recoils/receptionRecoil';
import { Button, Calendar, Col, Divider, Radio, Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const StyleDiv = styled.div`
    border-bottom: 1px solid #eee;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`;

const ScheduleSelect = () => {
    const { Title } = Typography;
    const receptionStep = useSetRecoilState(receptionStepAtom);

    const [timeSelect, setTimeSelect] = useState<number>(1);

    const handlePreviousClick = () => {
        receptionStep('Step6');
    };

    const handleNextClick = () => {
        receptionStep('Step8');
    };

    const data = [
        { time: '10:00', status: 'Y' },
        { time: '10:30', status: 'N' },
        { time: '11:00', status: 'Y' },
        { time: '11:30', status: 'N' },
        { time: '12:00', status: 'N' },
        { time: '12:30', status: 'Y' },
        { time: '13:00', status: 'N' },
        { time: '13:30', status: 'Y' },
        { time: '14:00', status: 'N' },
        { time: '14:30', status: 'Y' },
        { time: '15:00', status: 'N' },
        { time: '15:30', status: 'Y' },
        { time: '16:00', status: 'N' },
        { time: '16:30', status: 'Y' },
        { time: '17:00', status: 'Y' },
        { time: '17:30', status: 'Y' },
        { time: '18:00', status: 'N' },
        { time: '18:30', status: 'Y' },
        { time: '19:00', status: 'N' },
        { time: '19:30', status: 'N' },
    ];

    return (
        <>
            <Typography>
                <Title level={5}>
                    <blockquote>언제 상담하시겠어요?</blockquote>
                </Title>
            </Typography>

            <Divider />

            <div style={{display: 'flex', justifyContent:'space-between'}}>
                <div style={{width: '55%'}}>
                    <Calendar
                        fullscreen={false}
                        // onPanelChange={onPanelChange}
                        style={{
                            border: 'solid 1px #e9e9e9',
                        }}
                        // onSelect={(e) => setSelectDate(e.format('YYYY년 MM월 DD일'))}
                    />
                    {/* <DatePicker
                        open={true}
                        inputReadOnly={true}
                        showToday={false}
                        autoFocus={true}
                        style={{
                            //border
                            borderRadius: 5,
                            width: '100%'
                        }}
                        format={'YYYY-MM-DD'}
                        //value={startDate ? dayjs(startDate, 'YYYY-MM-DD') : null}
                        //onChange={(date) => setStartDate(date?.format('YYYY-MM-DD'))}
                    /> */}
                </div>
                <div
                    style={{
                        border: '1px solid #e9e9e9',
                        height: 400,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: '40%'
                    }}
                >
                        
                    
                    <Radio.Group
                        defaultValue={0}
                        //onChange={(e) => setTimeSelect(e.target.value)}
                        value={timeSelect}
                    >
                        <Row>
                            {data.map((item, index) => {
                                return (
                                    <>
                                        <Col
                                            className="gutter-row"
                                            span={24}
                                            onClick={()=>setTimeSelect(index)}
                                        >
                                            <StyleDiv>
                                                <Space align="center">
                                                    <div
                                                        style={{
                                                            width: '3rem',
                                                        }}
                                                    >
                                                        <Radio value={index}></Radio>
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontWeight: 'bold',
                                                            width: '3.5rem',
                                                        }}
                                                    >
                                                        {item.time}
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '3.5rem',
                                                        }}
                                                    >
                                                        {item.status === 'Y' ? (
                                                            <CheckOutlined
                                                                style={{
                                                                    color: 'green',
                                                                    fontSize: '16px',
                                                                    fontWeight: 800,
                                                                }}
                                                            />
                                                        ) : (
                                                            <CloseOutlined
                                                                style={{
                                                                    color: '#ff6574',
                                                                    fontSize: '16px',
                                                                    fontWeight: 800,
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </Space>
                                            </StyleDiv>
                                        </Col>
                                    </>
                                );
                            })}
                        </Row>
                    </Radio.Group>
                </div>
            </div>

            <Divider />

            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Space wrap>
                    <Button
                        size='large'
                        style={{
                            borderRadius: 5,
                            width: 150,
                        }}
                        onClick={handlePreviousClick}
                    >
                        <span>이전</span>
                    </Button>

                    <Button
                        size='large'
                        type="primary"
                        style={{
                            borderRadius: 5,
                            width: 300,
                            color: 'black',
                        }}
                        onClick={handleNextClick}
                    >
                        <span>다음</span>
                    </Button>
                </Space>
            </div>
        </>
    );
};

export default ScheduleSelect;
