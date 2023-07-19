import React from 'react';

import Layout, { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { MainHeader } from './Header';
import { MainFooter } from './Footer';

// interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {
//     crumbs?: string[];
// }

export const MainLayout = () => {
    // const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
    // const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

    // useEffect(() => {
    //     const ShowButtonClick = () => {
    //         if (window.scrollY > 100) {
    //             setBtnStatus(true);
    //         } else {
    //             setBtnStatus(false);
    //         }
    //     };
    //     window.addEventListener('scroll', ShowButtonClick);
    //     return () => {
    //         window.removeEventListener('scroll', ShowButtonClick);
    //     };
    // }, []);

    // const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    //     setScrollY(0);  // ScrollY 의 값을 초기화
    //     setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
    // }
    return (
        <Layout>
            <MainHeader />
            <div
                style={{
                    backgroundColor: 'white'
                }}
            >
                <Content
                    style={{
                        backgroundColor: 'white',
                        minHeight: '90vh',
                        paddingBottom: '3rem',
                        width: '70%',
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'start',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ width: '95%' }}>
                            <Outlet />
                        </div>
                    </div>
                    {/* <button
                        aria-label="topButton"
                        className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
                        onClick={handleTop}  // 버튼 클릭시 함수 호출
                    /> */}
                </Content>
            </div>
            <MainFooter />
        </Layout>
    );
};
