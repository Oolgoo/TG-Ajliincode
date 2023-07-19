import { Button, Col, Divider, Modal, ModalProps, Radio, Row } from "antd";
import { petSelectSymptAtom } from "common/components/PetMng/petRercoil";
import { useRecoilState } from "recoil";

import etc from 'assets/img/survey/etc.png';
import behavior from 'assets/img/survey/behavior.png';
import digestion from 'assets/img/survey/digestion.png';
import injection from 'assets/img/survey/injection.png';
import eye from 'assets/img/survey/eye.png';
import bacteria from 'assets/img/survey/bacteria.png';
import weight from 'assets/img/survey/weight.png';
import common from 'assets/img/survey/common.png';
import styled from "styled-components";
import { useEffect, useState } from "react";

interface AskTypSelectModalProps extends ModalProps {
    closeModal: () => void;
}

const StyleDiv = styled.div`
    border: 1px solid #e9e9e9;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background: #f9f1bb;
    }
    display: flex;
    justify-content: space-between;
`;

export const AskTypSelectModal = (props: AskTypSelectModalProps) => {
    const { open, closeModal } = props;

    const [symp, setSymp] = useRecoilState(petSelectSymptAtom);

    const [symptSelect, setSymptSelect] = useState<string>('');

    useEffect(()=>{
        if(symp){
            setSymptSelect(symp);
        }
    },[])

    const handleSave =() =>{
        setSymp(symptSelect);
        closeModal();
    }
    
    return (
        <>
            <Modal
                maskClosable={false}
                title={'어떤 상담을 받고 싶으세요?'}
                closable
                destroyOnClose
                onCancel={() => {
                    closeModal();
                }}
                open={open}
                footer={false}
            >
                <div>
                    <Radio.Group
                        defaultValue={1}
                        onChange={(e) => setSymptSelect(e.target.value)}
                        value={symptSelect}
                    >
                        <Row gutter={[16, 12]}>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('01')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={behavior}
                                            style={{ width: '60%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        행동장애
                                    </div>
                                    <Radio
                                        value={'01'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('02')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={digestion}
                                            style={{ width: '60%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        소화
                                    </div>
                                    <Radio
                                        value={'02'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('03')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={injection}
                                            style={{ width: '60%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        예방접종
                                    </div>
                                    <Radio
                                        value={'03'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('04')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={eye}
                                            style={{ width: '60%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        안구
                                    </div>
                                    <Radio
                                        value={'04'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('05')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={common}
                                            style={{ width: '70%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        공통문제
                                    </div>
                                    <Radio
                                        value={'05'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('06')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={bacteria}
                                            style={{ width: '60%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        기생충
                                    </div>
                                    <Radio
                                        value={'06'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('07')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={weight}
                                            style={{ width: '60%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        다이어트
                                    </div>
                                    <Radio
                                        value={'07'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={12}
                                onClick={() => setSymptSelect('08')}
                            >
                                <StyleDiv>
                                    <div
                                        style={{
                                            width: '25%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#F9F1BB',
                                            margin: 5,
                                            borderRadius: 100,
                                        }}
                                    >
                                        <img
                                            src={etc}
                                            style={{ width: '60%', padding: 10 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            fontSize: '1.5em',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        기타문제
                                    </div>
                                    <Radio
                                        value={'08'}
                                        style={{
                                            width: '10%',
                                            textAlign: 'center',
                                        }}
                                    ></Radio>
                                </StyleDiv>
                            </Col>
                        </Row>
                    </Radio.Group>
                </div>

                <Divider />
                <Row justify='end' style={{ marginTop: 15 }} >
                    <Button
                        style={{ marginRight: 5 }}
                        type="primary"
                        onClick={()=> handleSave()}
                    >저장
                    </Button>
                    <Button
                        onClick={() => {
                            closeModal();
                        }}
                    >닫기
                    </Button>
                </Row>
            </Modal>
        </>
    )
}