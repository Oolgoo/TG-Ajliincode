import React from "react";
import quoteL from 'assets/img/intro/quote_left.png'
import quoteR from 'assets/img/intro/quote_right.png'
import intro from 'assets/img/intro/intro.jpg'
import intro2 from 'assets/img/intro/intro2.jpg'
import intro3 from 'assets/img/intro/intro3.jpg'
import { MainContentHeader } from "common";
import { CaretRightOutlined } from "@ant-design/icons";

const IntroMain = () => {
    const content = `ANIWIDE 에 대해 설명해드릴게요`;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '70%' }}>
                    <MainContentHeader title={`ANIWIDE 란?`} content={content} />
                    <div style={{ width: '100%', marginTop: '3rem' }}>
                        <img src={intro3} style={{ width: '100%', height: '60vh', objectFit: 'cover' }} />
                    </div>
                    <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '1.3em', marginTop: '1rem', marginBottom: '3rem' }}>
                        <span style={{ lineHeight: '50px', letterSpacing: '1px', fontSize: '1.1em' }}>
                            슬기로운 <strong>반려생활</strong>을 위한 맞춤형 <strong style={{ textDecoration: 'underline 5px #F2B95F' }}>원격상담</strong> 플랫폼
                        </span>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#F5F5F5' }}>
                <div style={{ width: '70%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', marginBottom: '3rem' }}>
                        <div style={{ width: '46%', textAlign: 'right', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                            <span style={{ lineHeight: '50px', letterSpacing: '1px', fontSize: '1.4em' }}>
                                반려동물의 <strong style={{ textDecoration: 'underline 5px #F2B95F' }}>건강, 행동, 생활 습관</strong>에 대한 
                                <br/> 
                                평소의 <strong>궁금증</strong>을 고민하고 해결하는 공간
                            </span>
                        </div>
                        <div style={{ width: '48%' }}>
                            <img src={intro} style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '70%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', marginBottom: '3rem' }}>
                        <div style={{ width: '48%' }}>
                            <img src={intro2} style={{ width: '100%' }} />
                        </div>
                        <div style={{ width: '48%', alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '1.3em' }}>
                            <img src={quoteL} style={{ width: 'auto', height: 80 }} />
                            <strong style={{ textDecoration: 'underline 5px #F2B95F' }}>원하는 시간, 원하는 장소</strong>에서 상담해보세요.
                            <img src={quoteR} style={{ width: 'auto', height: 80 }} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#F7D7A3', marginBottom: '10rem' }}>
                <div style={{ width: '70%' }}>
                    <div style={{ marginTop: '3rem' }}>
                        <span
                            style={{
                                // color: 'white',
                                letterSpacing: '2px',
                                fontSize: '1.4em',
                                // textShadow: '1px 1px 2px #D1D1CF',
                            }}
                        >
                            <strong>ANIWIDE 원격상담</strong>, 이렇게 <strong>진행</strong>돼요
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '4rem',
                            marginBottom: '7rem'
                        }}
                    >
                        <div
                            style={{
                                width: '12%',
                                textAlign: 'center'
                                }}>
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 90,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '10em'
                                }}>
                                <span
                                    style={{
                                        fontSize: '1.1em',
                                        fontWeight: 600
                                    }}>
                                    가입
                                </span>
                            </div>
                            {/* <div>
                                <span style={{fontWeight: 600}}>STEP 1</span>
                            </div> */}
                        </div>
                        <CaretRightOutlined style={{width: '3%', margin: 0, padding: 0, justifyContent:'center'}}/>
                        <div
                            style={{
                                width: '12%',
                                height: '10em',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                borderRadius: 90,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <span
                                style={{
                                    fontSize: '1.1em',
                                    fontWeight: 600
                                }}>
                                반려동물<br />정보 등록
                            </span>
                        </div>
                        <CaretRightOutlined style={{width: '3%', margin: 0, padding: 0, justifyContent:'center'}}/>
                        <div
                            style={{
                                width: '12%',
                                height: '10em',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                borderRadius: 90,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <span
                                style={{
                                    fontSize: '1.1em',
                                    fontWeight: 600
                                }}>
                                원격상담 접수
                            </span>
                        </div>
                        <CaretRightOutlined style={{width: '3%', margin: 0, padding: 0, justifyContent:'center'}}/>
                        <div
                            style={{
                                width: '12%',
                                height: '10em',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                borderRadius: 90,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <span
                                style={{
                                    fontSize: '1.1em',
                                    fontWeight: 600
                                }}>
                                문진표 <br /> 작성 및 제출
                            </span>
                        </div>
                        <CaretRightOutlined style={{width: '3%', margin: 0, padding: 0, justifyContent:'center'}}/>
                        <div
                            style={{
                                width: '12%',
                                height: '10em',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                borderRadius: 90,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <span
                                style={{
                                    fontSize: '1.1em',
                                    fontWeight: 600
                                }}>
                                상담 예약 확정
                            </span>
                        </div>
                        <CaretRightOutlined style={{width: '3%', margin: 0, padding: 0, justifyContent:'center'}}/>
                        <div
                            style={{
                                width: '12%',
                                height: '10em',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                borderRadius: 90,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <span
                                style={{
                                    fontSize: '1.1em',
                                    fontWeight: 600
                                }}>
                                원격상담
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IntroMain;