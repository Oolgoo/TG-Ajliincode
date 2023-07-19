import React from 'react';
//import { Select } from "antd"
import { Footer } from 'antd/es/layout/layout';
import logo from '../../../assets/img/logo/logoA_lightGray2.png';
import logo1 from '../../../assets/img/logo/logoA_yellow2.png';

//import styled from "styled-components";

// const StyledSelect = styled(Select)`
//     .ant-select-selection-item{
//         color: white;
//     }
//     .ant-select-arrow{
//         color: white;
//     }
//     .ant-select-open{
//         color: white !important;
//     }
// `
export const MainFooter = () => {
    return (
        <>
            {/* <div
                style={{
                    backgroundColor: '#484c4e',
                    height: '2rem',
                    //borderTop: '1px solid #ddd',
                    textAlign: 'center',
                }}
            >
                <span
                    style={{
                        verticalAlign: '-webkit-baseline-middle',
                        cursor: 'pointer',
                        color: '#eee',
                    }}
                //onClick={()=>{}}
                >
                    모바일로 변경
                </span>
            </div> */}

            <Footer
                className={'backPrimary'}
                style={{
                    color: 'white',
                    backgroundColor: '#3f4345',
                    //borderTop: '1px solid #ddd',
                    height: '6.5rem',
                    display: 'flex',
                    width: '100%',
                    bottom: 0,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        margin: '0px auto',
                        width: '95%',
                        textAlign: 'start',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'start'
                    }}>
                        <div style={{ width: '15%' }}>
                            <img src={logo1} height="40" alt="react-logo" style={{marginTop: 10}}/>
                        </div>
                        <div style={{ font:'inherit', fontSize: '0.7rem', fontWeight: 100, cursor: 'pointer', color: '#bbbbbb' }}>
                            <div>
                                <span >소개</span>
                                <span style={{padding: '0px 12px', color: '#ffffff99'}}>|</span>
                                <span >제휴문의(?)</span>
                                <span style={{padding: '0px 12px', color: '#ffffff99'}}>|</span>
                                <span >공지사항</span>
                                <span style={{padding: '0px 12px', color: '#ffffff99'}}>|</span>
                                <span >고객센터</span>
                                <span style={{padding: '0px 12px', color: '#ffffff99'}}>|</span>
                                <span>서비스이용약관</span>
                                <span style={{padding: '0px 12px', color: '#ffffff99'}}>|</span>
                                <span>개인정보처리방침</span>
                            </div>
                            <div style={{ marginTop: 5 }}>
                                <span>대표 </span>
                                <span>어쩌구~~~~</span> 
                                <span>사업자등록번호</span>
                                <span>어쩌구~~~~~~~</span>
                                <br />
                                <span>주소 어쩌구~~       </span>
                                <span>대표전화: 070-~~~~~~</span>
                            </div>
                            <div style={{ fontSize: '0.7rem', marginTop: 7 }}>
                                Copyright 2023 by TG All rights reserved.
                            </div>
                        </div>
                        <div style={{ width: '40%' }} />
                    </div>
                </div>
            </Footer>
        </>
    );
};
