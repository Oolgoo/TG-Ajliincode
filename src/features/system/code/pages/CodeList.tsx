import { Button, Col, Input, InputNumber, Row, Switch } from 'antd';
import { MainContentHeader } from 'common';
import React from 'react';

export const CodeList = () => {
    return (
        <>
            <MainContentHeader title={`코드관리`} content={'content'} />
            <Row style={{height: 400, marginTop: '4rem'}}>
                <Col span={12} style={{ border: '1px solid #e9e9e9', padding: 20 }}>
                    <Row>
                        <Col span={6}>
                            <h6
                                className='font-test'
                                style={{
                                    float: 'left',
                                    marginTop: 12,
                                    marginBottom: 20,
                                    fontSize: '1.5em'
                                }}>
                                코드목록
                            </h6>
                        </Col>
                        <Col span={12}>
                            <Input style={{ marginTop: 5 }} autoFocus={true} />
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                            <Button
                                size='middle'
                                style={{
                                    width: 60,
                                    marginTop: 5,
                                    marginRight: 5
                                }}
                                // onClick={() => handleSearch()}
                            >
                                검색
                            </Button>
                            <Button
                                type='primary'
                                size='middle'
                                style={{
                                    width: 60,
                                    marginTop: 5,
                                    marginRight: 5
                                }}
                                // onClick={() => setShowAddModal(true)}
                            >
                                추가
                            </Button>
                        </Col>
                    </Row>
                    {/* <Tree
                        treeData={codeList}
                        showIcon
                        height={400}
                        showLine
                        titleRender={(e: any) => e.useYn === 'N' ?
                            (<span style={{ color: '#b3b3b3' }}>{e.title}</span>)
                            :
                            (<span>{e.title}</span>)}
                        onSelect={(key, target) => { selectItem(target.selected, target.node) }}
                    /> */}
                </Col>
                <Col span={12} style={{ borderLeft: 'none', border: '1px solid #e9e9e9', padding: 20 }}>
                    <Row>
                        <Col span={12}>
                            <h5
                                className='font-test'
                                style={{
                                    float: 'left',
                                    marginTop: 12,
                                    marginBottom: 20,
                                    fontSize: '1.4em'
                                }}>코드상세정보</h5>
                        </Col>
                        {/* {
                            saveDelButton ? (
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button
                                        type='primary'
                                        size='middle'
                                        style={{
                                            width: 60,
                                            marginTop: 5,
                                            marginRight: 5
                                        }}
                                        onClick={onFinish}
                                    >
                                        저장
                                    </Button>
                                    <Button danger
                                        type='primary'
                                        size='middle'
                                        style={{
                                            width: 60,
                                            marginTop: 5,
                                            marginRight: 5
                                        }}
                                        onClick={() => setShowConfirmModal(true)}
                                    >
                                        삭제
                                    </Button>
                                </Col>) : (<></>)
                        } */}
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 20, paddingLeft: 20 }}>
                            <div style={{ display: 'table', marginBottom: 10, width: '100%' }}>
                                <span style={{ width: '20%', display: 'table-cell', verticalAlign: 'middle' }}>코드명</span>
                                <div style={{ display: 'table-cell', width: '80%' }}>
                                    <Input
                                        style={{ width: '60%' }}
                                        // disabled={visibleVal}
                                        // value={selectCodeNm}
                                        // onChange={e => setSelectCodeNm(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'table', marginBottom: 10, width: '100%' }}>
                                <span style={{ width: '20%', display: 'table-cell', verticalAlign: 'middle' }}>코드</span>
                                <div style={{ display: 'table-cell', width: '80%' }}>
                                    <Input
                                        style={{ width: '60%' }}
                                        // disabled={visibleVal}
                                        // value={selectCodeEngNm}
                                        // onChange={e => setSelectCodeEngNm(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'table', marginBottom: 10, width: '100%' }}>
                                <span style={{ width: '20%', display: 'table-cell', verticalAlign: 'middle' }}>코드 설명</span>
                                <div style={{ display: 'table-cell', width: '80%' }}>
                                    <Input
                                        style={{ width: '60%' }}
                                        // disabled={visibleVal}
                                        // value={selectCodeExpln}
                                        // onChange={e => setSelectCodeExpln(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'table', marginBottom: 10, width: '100%' }}>
                                <p style={{ width: '20%', display: 'table-cell', verticalAlign: 'middle' }}>코드 순서</p>
                                <div style={{ display: 'table-cell', width: '80%' }}>
                                    <InputNumber
                                        // value={codeOrdr}
                                        // disabled={visibleVal}
                                        // onChange={e => setCodeOrdr(e)} 
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'table', marginBottom: 10, width: '100%' }}>
                                <span style={{ width: '20%', display: 'table-cell', verticalAlign: 'middle' }}>활성화 여부</span>
                                <Switch
                                    // disabled={visibleVal}
                                    // checked={selectSwitch}
                                    // onChange={() => setSelectSwitch(!selectSwitch)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* {showAddModal &&
                (
                    <CodeAddModal
                        closeAddModal={() => setShowAddModal(false)}
                        upperCodeNo={codeNo ? codeNo : undefined}
                        upperCodeNm={selectCodeNm ? selectCodeNm : undefined}
                        open={showAddModal}
                    />)
            }
            {showConfirmModal && (
                <ConfirmModal
                    dangerBool={true}
                    content='삭제 시 복구할 수 없습니다.'
                    okText='삭제'
                    okButtonType='primary'
                    cancelText='취소'
                    onOk={async () => {
                        const response = await codeApi.deleteCodeItem({ 'codeNo': Number(codeNo) });
                        if (response.status === 200) {
                            refresh();
                            refreshSelectCode();
                            message.success('삭제되었습니다.');
                            setShowConfirmModal(false);
                        }
                    }}
                    title='정말 삭제하시겠습니까?'
                    icon={<InfoCircleTwoTone twoToneColor='#ffcd44ff' style={{ fontSize: '2rem' }} />}
                    closeModal={() => setShowConfirmModal(false)}
                    open={showConfirmModal}
                />
            )} */}
        </>
    );
};
