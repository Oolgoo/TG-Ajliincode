import { Button, Tooltip, message } from 'antd';
import React from 'react';
import chatBtn from 'assets/img/realTime/chat_icon.png';
import share from 'assets/img/realTime/share2.png';
import close from 'assets/img/realTime/close_or.png';
import cam from 'assets/img/realTime/cam2.png';
import camOff from 'assets/img/realTime/camOff2.png';
import srvy from 'assets/img/realTime/srvy2.png';
import result from 'assets/img/realTime/result2.png';
import mic from 'assets/img/realTime/mic2.png';
import micOff from 'assets/img/realTime/micOff2.png';
import callOff from 'assets/img/realTime/callOff2.png';
import dayjs from 'dayjs';
import { DashboardOutlined } from '@ant-design/icons';

interface ConsultingRoomButtonsProps {
    handlMicBtnClick: () => void;
    handleCamBtnClick: () => void;
    handleResultBtnClick: () => void;
    handleChatBtnClick: () => void;
    handleShareBtnClick: () => void;
    handleSrvyBtnClick: () => void;
    micState: boolean;
    camState: boolean;
    shareState: boolean;
    endOpen: () => void;
}
export const ConsultingRoomButtons = (props: ConsultingRoomButtonsProps) => {
    const {
        handlMicBtnClick,
        handleCamBtnClick,
        handleResultBtnClick,
        handleChatBtnClick,
        handleShareBtnClick,
        handleSrvyBtnClick,
        micState,
        camState,
        shareState,
        endOpen
    } = props;

    const thisTime = () => {
        const now = dayjs();
        return now.format('HH:mm');
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around',
                    height: '3.5rem',
                    position: 'fixed',
                    bottom: 0,
                }}>
                <div
                    style={{ width: '25%', display: 'flex', justifyContent: 'left', marginLeft: '5%' }}>
                    <div style={{ backgroundColor: '#fef7ec' , height: 'fit-content', padding: '10px 20px', borderRadius: 20, fontWeight: 600 }}>
                        <DashboardOutlined />
                        <span style={{marginLeft: 10}}>{thisTime()}</span>
                    </div>
                </div>
                <div
                    style={{ width: '40%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#FEF7EC',
                        borderTopLeftRadius: 90,
                        borderTopRightRadius: 90
                    }}>
                        <Tooltip title={'마이크 on/off'}>
                            <Button
                                type='text'
                                style={{
                                    width: '2.5rem',
                                    height: '3rem',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '5px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handlMicBtnClick()}
                                icon={<img src={micState ? mic : micOff} width={30} height={30} />}
                            />
                        </Tooltip>
                        <Tooltip title={'카메라 on/off'}>
                            <Button
                                type='text'
                                style={{
                                    width: '2.5rem',
                                    height: '3rem',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '5px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => shareState ? message.error('화면공유중에는 카메라를 끌 수 없습니다.') : handleCamBtnClick()}
                                icon={<img src={camState ? cam : camOff} width={30} height={30} />}
                            />
                        </Tooltip>
                        <Tooltip title={'화면공유'}>
                            <Button
                                type='text'
                                style={{
                                    width: '2.5rem',
                                    height: '3rem',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '5px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleShareBtnClick()}
                                icon={<img src={!shareState ? share : close} width={30} height={30} />}
                            />
                        </Tooltip>
                        <Tooltip title={'문진표 조회'}>
                            <Button
                                type='text'
                                style={{
                                    width: '2.5rem',
                                    height: '3rem',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '5px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleSrvyBtnClick()}
                                icon={<img src={srvy} width={30} height={30} />}
                            />
                        </Tooltip>
                        <Tooltip title={'상담 결과 및 조회'}>
                            <Button
                                type='text'
                                style={{
                                    width: '2.5rem',
                                    height: '3rem',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '5px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleResultBtnClick()}
                                icon={<img src={result} width={30} height={30} />}
                            />
                        </Tooltip>
                        <Tooltip title={'상담종료'}>
                            <Button
                                type='text'
                                style={{
                                    width: '2.5rem',
                                    height: '3rem',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '5px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => endOpen()}
                                icon={<img src={callOff} width={30} height={30} />}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div
                    style={{ width: '30%', display: 'flex', justifyContent: 'right' }}
                >
                    <Tooltip title={'채팅창 on/off'} placement="topRight">
                        <div
                            onClick={() => handleChatBtnClick()}
                            style={{
                                backgroundColor: '#3c4043',
                                borderRadius: '30px',
                                width: '2.5rem',
                                height: '2.5rem',
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '5px',
                                cursor: 'pointer',
                                marginRight: '1.5rem',
                                boxShadow: '2px 2px 10px 5px #0000001a'
                            }}>
                            <img src={chatBtn} style={{ width: '1.7rem', height: '1.7rem' }} />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}