import { Button, Card, List, Space, Tag, Typography, Image, Calendar, Radio, Row, Col, Divider, Modal, Input, Tooltip } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import { MainContentHeader } from 'common';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ConsultResultDetailModal, SurveyListModal } from 'features/consult/realtime';
import * as paths from 'routes/const';
import { data } from 'features/consult/reception/pages/Data';
import dayjs from 'dayjs';
import { FileSearchOutlined } from '@ant-design/icons';

const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

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

const StyleCalender = styled(Calendar)`
:where(.css-dev-only-do-not-override-ipwls).ant-picker-calendar .ant-picker-content td {
    width: 100%;
    border-top-style: solid;
    border-top-width: thin;
    border-top-color: #e9e9e9;
    text-align: start;
    padding: 0;
}
:where(.css-dev-only-do-not-override-ipwls).ant-picker-calendar .ant-picker-cell .ant-picker-cell-inner {
    height: 60px;
    display: grid;
}
`;
const VetConsultList = () => {
    const navigate = useNavigate();
    const { Title } = Typography;

    const [openSurveyList, setOpenSurveyList] = useState<boolean>(false);
    const [openNameModal, setOpenNameModal] = useState<boolean>(false);
    const [nameState, setNameState] = useState<string | undefined>(undefined);

    const content = `수의사님의 도움이 필요한 보호자님과 동물 친구들이 있어요!`;

    const [timeSelect, setTimeSelect] = useState<number>(1);

    const time = [
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

    const [selectDate, setSelectDate] = useState<string | undefined>();

    const [showResult, setShowResult] = useState<boolean>(false);

    //상담 시작
    const handleOk = () => {
        navigate(paths.ROUTE_REALTIME);
    }

    // TODO: 표시될 date값 배열 혹은 맵으로 filter화
    const getCellRender = (date: any) => {
        if (date.format('YYYY-MM-DD') === '2023-06-08' || date.format('YYYY-MM-DD') === '2023-06-15') {
            return (
                <div style={{ backgroundColor: '#f5c52373', color: 'white' }}>
                    상담이 있습니다.
                </div>
            )
        } else if (date.format('YYYY-MM-DD') === '2023-06-10') {
            return (
                <div style={{ color: 'darkGray' }}>
                    x
                </div>
            )
        }
        return;
    }

    return (
        <>
            <MainContentHeader title={`MY 상담 내역`} content={content} />

            <div style={{ display: "flex", justifyContent: 'start', marginBottom: '1rem' }}>
                <Card style={{ width: '25%', marginRight: '2rem', borderTop: 'solid 2px #747474' }}>
                    <h2>나의 상담</h2>
                    <h3>2건</h3>
                </Card>
                <Card style={{ width: '25%', marginRight: '2rem', borderTop: 'solid 2px #747474' }}>
                    <h2>상담 완료</h2>
                    <h3>1건</h3>
                </Card>
                <Card style={{ width: '25%', borderTop: 'solid 2px #747474' }}>
                    <h2>상담 예정</h2>
                    <h3>1건</h3>
                </Card>
            </div>
            <Title level={3} style={{ display: 'inline-block' }}>나의 상담 스케줄</Title>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: 'solid 2px #747474',
                    paddingTop: '1rem'
                }}
            >
                <StyleCalender
                    fullscreen={false}
                    onPanelChange={onPanelChange}
                    style={{
                        width: '60%',
                        border: 'solid 1px #e9e9e9'
                    }}
                    dateCellRender={(date) => getCellRender(date)}
                    onSelect={(e) => setSelectDate(e.format('YYYY년 MM월 DD일'))}
                    disabledDate={(date) => {
                        // TODO: diable할 날짜 배열 필터링해서 뿌려주기
                        if (dayjs().diff(date, 'd') > 0 || date.format('YYYY-MM-DD') === "2023-06-10") {
                            return true;
                        }
                        return false;
                    }}
                />
                <div
                    style={{
                        border: '1px solid #e9e9e9',
                        height: 450,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: '35%'
                    }}
                >
                    <div style={{ textAlign: 'center', fontWeight: 600 }}>
                        <h3>{selectDate}</h3>
                    </div>
                    <Divider />
                    <Radio.Group
                        defaultValue={0}
                        onChange={(e) => setTimeSelect(e.target.value)}
                        value={timeSelect}
                    >
                        <Row>
                            {time.map((item, index) => {
                                return (
                                    <>
                                        <Col
                                            className="gutter-row"
                                            span={24}
                                        >
                                            <StyleDiv style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div
                                                    style={{
                                                        fontWeight: 'bold',
                                                        width: '30%',
                                                        alignSelf: 'center'
                                                    }}
                                                >
                                                    {item.time}
                                                </div>
                                                <div
                                                    style={{
                                                        width: '70%',
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    {item.status === 'Y' ? (
                                                        <>
                                                            <Tooltip title={'문진표 조회'}>
                                                                <FileSearchOutlined 
                                                                    twoToneColor="#F2B95F" 
                                                                    onClick={() => setOpenSurveyList(true)}
                                                                    style={{
                                                                        width: 30,
                                                                        fontSize: 25,
                                                                        color: '#F2B95F'
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                            <Button
                                                                type="primary"
                                                                style={{
                                                                    borderRadius: 5,
                                                                    color: '#23180C',
                                                                    alignSelf: 'center',
                                                                    backgroundColor: '#F2B95F',
                                                                    fontWeight: 600,
                                                                    marginRight: 10
                                                                }}
                                                            >
                                                                상담확정
                                                            </Button>
                                                            <Button
                                                                type="primary"
                                                                danger
                                                                style={{
                                                                    borderRadius: 5,
                                                                    alignSelf: 'center',
                                                                    fontWeight: 600,
                                                                    backgroundColor: '#F67953',
                                                                    color: '#23180C',
                                                                }}
                                                            >
                                                                상담취소
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Radio value={index}>상담가능</Radio>
                                                            <Radio value={index}>상담불가능</Radio>
                                                        </>
                                                    )}

                                                </div>
                                            </StyleDiv>
                                        </Col>
                                    </>
                                );
                            })}
                        </Row>
                    </Radio.Group>
                </div>
            </div>
            <Title level={3} style={{ display: 'inline-block' }}>나의 상담 목록</Title>
            <div style={{ borderTop: 'solid 2px #747474', paddingTop: '1rem' }}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        position: 'bottom',
                        align: 'center',
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: 'solid 1px #e9e9e9',
                                    marginBottom: '0.5rem',
                                    marginTop: '0.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        width: '15%',
                                        textAlign: 'center',
                                        padding: 15,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '70%',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <Image
                                            src={item.userAvatar}
                                            style={{
                                                borderRadius: 10,
                                                height: '7rem',
                                                width: '7rem'
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            borderRadius: 10,
                                            width: '7rem',
                                            backgroundColor: '#FBF0CA',
                                            color: '#23180C',
                                            fontWeight: 600,
                                            marginTop: 5,
                                            display: 'inline-block',
                                            padding: 5,
                                        }}>
                                        {item.petName}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '65%' }}>
                                    <div style={{ width: '100%' }}>
                                        <List.Item
                                            key={item.userTitle}
                                            style={{
                                                height: '10rem',
                                                padding: '10px',
                                                cursor: 'pointer'
                                            }}
                                            actions={[
                                                <Space
                                                    key="action"
                                                    size={[0, 8]}
                                                    wrap
                                                >
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDF5E6"
                                                    >
                                                        강아지
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDEDD1"
                                                    >
                                                        푸들
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDE5BC"
                                                    >
                                                        여
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDDDA7"
                                                    >
                                                        2살
                                                    </Tag>
                                                    <Tag
                                                        bordered={false}
                                                        style={{
                                                            borderRadius: '3px',
                                                            color: '#685945'
                                                        }}
                                                        color="#FDD592"
                                                    >
                                                        중성화O
                                                    </Tag>
                                                </Space>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ margin: 0, width: '100%' }}>{item.userTitle}
                                                                <span
                                                                    style={{
                                                                        fontSize: 13,
                                                                        padding: '5px 15px',
                                                                        color: '#E79C0D',
                                                                        backgroundColor: '#FCF5E6',
                                                                        borderRadius: 15,
                                                                        border: 'solid 1px #FCDB95',
                                                                        width: '10%',
                                                                        marginLeft: 5
                                                                    }}
                                                                >
                                                                    {item.petSymptom}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                description={item.userDescription}
                                            />
                                            <div style={{
                                                width: '100%',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {item.userContent}
                                            </div>
                                        </List.Item>
                                    </div>
                                </div>
                                <div style={{ width: '10%', padding: 10, alignSelf: 'center' }}>
                                    <Button
                                        type="primary"
                                        style={{
                                            height: '8rem',
                                            borderRadius: 10,
                                            color: '#23180C',
                                            float: 'right',
                                            alignSelf: 'center',
                                            backgroundColor: '#F5C523',
                                            fontWeight: 600
                                        }}
                                        onClick={() => setOpenSurveyList(true)}
                                    >
                                        <span>문진표<br />조회</span>
                                    </Button>
                                </div>
                                <div key="statusBtn" style={{ width: '10%', padding: 10, alignSelf: 'center' }}>
                                    {
                                        item.status === 'Y' ? (
                                            <Button
                                                type="primary"
                                                style={{
                                                    height: '8rem',
                                                    borderRadius: 10,
                                                    color: '#23180C',
                                                    float: 'right',
                                                    backgroundColor: '#FBE7A2',
                                                    fontWeight: 600,
                                                    width: '7rem'
                                                }}
                                                onClick={() => handleOk()}
                                            >
                                                <span>동물친구<br />만나러가기</span>
                                            </Button>
                                        ) : item.status === 'N' ? (
                                            <>
                                                <Button
                                                    type="text"
                                                    style={{
                                                        height: '3.5rem',
                                                        borderRadius: 10,
                                                        marginBottom: 10,
                                                        color: '#23180C',
                                                        backgroundColor: '#F7A95B',
                                                        float: 'right',
                                                        fontWeight: 600,
                                                        width: '7rem'
                                                    }}
                                                >
                                                    <span>예약확정</span>
                                                </Button>
                                                <br />
                                                <Button
                                                    type="primary"
                                                    danger
                                                    style={{
                                                        height: '3.5rem',
                                                        borderRadius: 10,
                                                        color: '#23180C',
                                                        float: 'right',
                                                        fontWeight: 600,
                                                        width: '7rem',
                                                        backgroundColor: '#F67953'
                                                    }}
                                                >
                                                    <span>예약취소</span>
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    type="primary"
                                                    style={{
                                                        height: '8rem',
                                                        borderRadius: 10,
                                                        color: '#23180C',
                                                        float: 'right',
                                                        alignSelf: 'center',
                                                        backgroundColor: '#FBE7A2',
                                                        fontWeight: 600,
                                                        width: '7rem'
                                                    }}
                                                    onClick={() => setShowResult(true)}
                                                >
                                                    <span>상담결과 <br /> 보기</span>
                                                </Button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    )}
                />
            </div>
            {
                openSurveyList && (
                    <SurveyListModal
                        closeModal={() => setOpenSurveyList(false)}
                        open={openSurveyList}
                    />
                )
            }
            {
                showResult && (
                    <ConsultResultDetailModal
                        closeModal={() => setShowResult(false)}
                        open={showResult}
                    />
                )
            }
            {
                openNameModal && (
                    <>
                        <Modal
                            title="이름을 입력해주세요."
                            open={openNameModal}
                            onOk={handleOk}
                            onCancel={() => setOpenNameModal(false)}
                        >
                            이름
                            <Input value={nameState} onChange={e => setNameState(e.target.value)} />
                        </Modal>
                    </>
                )
            }
        </>
    );
};

export default VetConsultList;