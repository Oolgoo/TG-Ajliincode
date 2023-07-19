import React, { useEffect } from 'react';
import { Button, Dropdown, Menu, MenuProps, Tooltip } from 'antd';
import * as paths from 'routes/const';
import {
    UserOutlined,
    UserAddOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/img/logo/logoA_black2.png';
import { joinStepAtom } from 'features/join';
import { useRecoilState } from 'recoil';
import { userDataAtom } from 'common/apis';

export const MainNav = () => {

    const [userData, setUserData] = useRecoilState(userDataAtom);

    useEffect(() => {
        const a = sessionStorage.getItem('userData');
        if (a) {
            setUserData(JSON.parse(a));
        }
    }, [])

    const [joinStep, setJoinStep] = useRecoilState(joinStepAtom);

    const menuList = [
        {
            key: paths.ROUTE_INTRO,
            label: 'ANIWIDE'
        },
        {
            key: paths.ROUTE_RECEPTION,
            label: '실시간 상담'
        },
        {
            key: paths.ROUTE_ASK,
            label: '묻고답하기',
        },
        {
            key: '3',
            label: '커뮤니티',
            children: [
                {
                    key: paths.ROUTE_NOTICE,
                    label: '공지사항',
                },
                {
                    key: paths.ROUTE_FAQ,
                    label: '자주묻는 질문',
                },
            ],
        },
    ];

    const items2: MenuProps['items'] = [
        {
            key: paths.ROUTE_VET_ANSWER,
            label: 'My답변내역',
        },
        {
            key: paths.ROUTE_VET_CONSULT,
            label: 'My실시간상담내역',
        },
        {
            key: paths.ROUTE_VET_INFO,
            label: '계정정보',
        },
    ]

    const items1: MenuProps['items'] = [
        {
            key: paths.ROUTE_USER_ASK,
            label: 'My질문내역',
        },
        {
            key: paths.ROUTE_USER_CONSULT,
            label: 'My상담내역',
        },
        {
            key: paths.ROUTE_USER_PET,
            label: '반려동물',
        },
        {
            key: paths.ROUTE_USER_INFO,
            label: '계정정보',
        },
    ]

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    };

    const navigate = useNavigate();

    const logOut = () => {
        setUserData(undefined);
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userData");
        navigate(paths.ROUTE_LOGIN);
    }

    return (
        <div
            style={{
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: 'white',
                borderBottom: '1px solid #ddd',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                    }} >
                    <div
                        style={{
                            cursor: 'pointer',
                            width: '11rem',
                            marginLeft: '50px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        onClick={() => navigate(paths.ROUTE_MAIN)}
                    >
                        <img
                            src={logo}
                            height="30"
                            alt="react-logo"
                            style={{ float: 'right' }}
                        />
                    </div>
                    <Menu
                        key="mainMenu"
                        className="font-nav"
                        items={menuList}
                        mode="horizontal"
                        triggerSubMenuAction="hover"
                        style={{
                            display: 'inline-block',
                            fontSize: '1em',
                            fontWeight: 600,
                            fontFamily: 'appleM',
                            minWidth: '30%',
                            borderBottom: 'none',
                        }}
                        onClick={(target) => {
                            navigate(target.key);
                        }}
                    />
                </div>
                <div
                    style={{
                        marginTop: 10,
                        width: '50rem',
                        textAlign: 'right',
                        marginRight: 20
                    }}
                >
                    {userData && (
                        <Dropdown
                            menu={{
                                items: userData?.role == 'ROLE_NORMAL' ? items1 : items2,
                                onClick: handleMenuClick,
                            }}
                            placement="bottom"
                            arrow
                        >
                            <Button
                                type="text"
                                style={{
                                    fontSize: '1em',
                                    fontWeight: 600,
                                    fontFamily: 'NEXON Lv1 Gothic OTF',
                                }}>마이페이지</Button>
                        </Dropdown>
                    )
                    }
                    {
                        userData?.role == 'ROLE_ADMIN'
                        && (
                            <>
                                <Tooltip placement="bottomRight" title={'환경설정'}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '1em',
                                            fontWeight: 600,
                                            fontFamily: 'NEXON Lv1 Gothic OTF',
                                            padding: '3.5px 7px'
                                        }}
                                        onClick={() => navigate(paths.ROUTE_SYSTEM_WITH_ID('author'))}
                                    >
                                        <SettingOutlined />
                                    </Button>
                                </Tooltip>
                            </>
                        )
                    }
                    {
                        (userData) ? (
                            <>
                                <Button
                                    type="text"
                                    style={{
                                        fontSize: '1em',
                                        fontWeight: 600,
                                        fontFamily: 'NEXON Lv1 Gothic OTF',
                                        padding: '3.5px 7px'
                                    }}
                                    onClick={() => logOut()}
                                >
                                    로그아웃
                                </Button>
                            </>
                        ) : (
                            <>
                                <Tooltip placement="bottomRight" title={'로그인'}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '1em',
                                            fontWeight: 600,
                                            fontFamily: 'NEXON Lv1 Gothic OTF',
                                            padding: '3.5px 7px'
                                        }}
                                        onClick={() => navigate(paths.ROUTE_LOGIN)}
                                    >
                                        <UserOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip placement="bottomRight" title={'회원가입'}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '1em',
                                            fontWeight: 600,
                                            fontFamily: 'NEXON Lv1 Gothic OTF',
                                            padding: '3.5px 7px'
                                        }}
                                        onClick={() => {
                                            navigate(paths.ROUTE_JOIN);
                                            setJoinStep('one')
                                        }}
                                    >
                                        <UserAddOutlined />
                                    </Button>
                                </Tooltip>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
