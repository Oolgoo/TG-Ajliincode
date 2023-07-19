import { Button, Divider, Input, Modal, ModalProps, Row } from "antd";
import React from 'react';

interface AddQuestionModalProps extends ModalProps {
    closeModal: () => void;
}

export const AddQuestionModal = (props: AddQuestionModalProps) => {

    const { open, closeModal } = props;

    return (
        <>
            <Modal
                maskClosable={false}
                title={'추가로 궁금한 사항을 입력해주세요.'}
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
                    placeholder='궁금한 점에 대해 상세히 입력해주세요.'
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