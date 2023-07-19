import React from 'react';
import { Button, Layout, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MAIN } from 'routes/const';
import { Link } from 'react-router-dom';

interface ErrorFallbackProps {
    error?: number;
    resetErrorBoundary: (...args: any[]) => void;
}

export const ErrorFallback = (props: ErrorFallbackProps) => {
    const { error, resetErrorBoundary } = props;

    return (
        <Layout>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    paddingBottom: 10,
                    background: 'white',
                    paddingTop: 100,
                    alignItems: 'center',
                    width: '100%',
                    height: '60px',
                }}
            >
                {/* <div style={{ boxShadow: '2px 2px 10px 5px #0000001a', marginTop: -10, paddingTop: 10, paddingBottom: 20, backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ cursor: 'pointer', width: '11rem' }}
                onClick={() => {
                  //history.replace(ROUTE_DASH_BOARD);
                }}>
              </div>
            </div>
          </div> */}
            </div>
            <Content
                style={{
                    backgroundColor: 'white',
                    paddingTop: '2rem',
                    minHeight: '85vh',
                    paddingBottom: '3rem',
                }}
            >
                <div style={{ textAlign: 'center', marginTop: '10rem' }}>
                    <h2>서비스에 접속할 수 없습니다.</h2>
                    <p>
                        새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.
                    </p>
                    <br />

                    <Space>
                        <Button
                            onClick={() => {
                                resetErrorBoundary();
                            }}
                        >
                            새로고침
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                window.location.href = `${ROUTE_MAIN}`;
                            }}
                            style={{
                                color: 'black',
                            }}
                        >
                            메인화면으로 이동
                        </Button>
                    </Space>
                </div>
            </Content>
        </Layout>
    );
};
