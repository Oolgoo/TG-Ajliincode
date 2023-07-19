import React from 'react';
import { MainContentHeader, userDataAtom } from 'common';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { askModalAtom, askStepAtom } from '../recoils/askRecoil';
import * as paths from 'routes/const';
import AskModalContainer from '../components/AskModalContainer';
import { AskRecList } from '../components/AskRecList';
import { AskAllList } from '../components';

//질문 목록 Page
const AskList = () => {

    //router navigate
    const navigate = useNavigate();

    const setAskStep = useSetRecoilState(askStepAtom);
    const [askModal, setAskModal] = useRecoilState(askModalAtom);

    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    const content = `반려동물에 대해 모든 걸 물어보세요! ANIWIDE의 수의사 분들께서 답변해 주실 거에요!`;

    const { Title } = Typography;

    const handleClickAsk = () => {
        if (userData) {
            setAskStep('Agree');
            setAskModal(true);
        } else {
            navigate(paths.ROUTE_LOGIN);
        }
    }

    return (
        <>
            <MainContentHeader title={`묻고 답하기`} content={content} />
            <div
                style={{
                    borderBottom: '1px solid #666',
                    margin: '15px 0 10px 0',
                    width: '100%',
                }}
            >
                <Title level={3} style={{ display: 'inline-block' }}>
                    주요 질문
                </Title>
                <Button
                    type="primary"
                    style={{
                        float: 'right',
                        marginTop: 25,
                        borderRadius: 5,
                        fontWeight: 600,
                        color: 'black',
                    }}
                    onClick={() => {
                        handleClickAsk()
                    }}
                >
                    물어보기
                </Button>
            </div>

            <AskRecList />

            <div
                style={{
                    borderBottom: '1px solid #666',
                    margin: '15px 0 10px 0',
                    width: '100%',
                }}
            >
                <Title level={3} style={{ display: 'inline-block' }}>
                    모든 질문
                </Title>
            </div>

            <AskAllList />

            {askModal && (
                <AskModalContainer
                    closeModal={() => setAskModal(false)}
                    open={askModal}
                />
            )}
        </>
    );
};

export default AskList;
