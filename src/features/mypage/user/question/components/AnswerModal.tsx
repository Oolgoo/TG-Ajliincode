import { Button, Divider, Input, Modal, ModalProps, Row } from "antd";
import React from 'react';

interface AnswerModalProps extends ModalProps {
    closeModal: () => void;
}

export const AnswerModal = (props: AnswerModalProps) => {

    const { open, closeModal } = props;

    return (
        <>
            <Modal
                maskClosable={false}
                title={'답변 의견'}
                closable
                destroyOnClose
                onCancel={() => {
                    closeModal();
                }}
                open={open}
                footer={false}
            >
                <Divider/>
                <Input.TextArea
                    placeholder='답변을 달아주세요.'
                    style={{ resize: 'none', height: 200 }}
                />
                <Row justify='end' style={{ marginTop: 15 }} >
                    <Button
                        style={{ marginRight: 5 }}
                        type="primary"
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