import React from "react";
import { useRoutes } from "react-router-dom";
import * as paths from './const';
import { LoginPage } from "../features/auth";
import { DashBoardLayout, MainLayout, NotFound } from "../common";
import PrivateRoute from "../common/components/PrivateRoute";
import { MainPage } from "../features/main";
import { LoginLayout } from "../common/layouts/login";
import { FullScreenLayout } from "common/layouts/FullScreenLayout";
import JoinContainer from "features/join/pages/JoinContainer";
import { FindAccountContainer } from "features/find/pages";
import { IntroMainPage } from "features/intro";
import { ReceptionListPage } from "features/consult";
import { FaqListPage, NoticeCreatePage, NoticeDetailPage, NoticeListPage } from "features/community";
import { UserQuestionListPage } from "features/mypage/user/question";
import { UserConsultListPage } from "features/mypage/user/consult";
import { UserPetPage } from "features/mypage/user/pet";
import { UserInfoPage } from "features/mypage/user/info";
import { VetAnswerListPage, VetConsultListPage, VetInfoPage } from "features/mypage/vet";
import { SystemListPage } from "features/system";
import Realtime from "features/consult/realtime/pages/Realtime";
import { AskCreatePage, AskDetailPage, AskListPage } from "features/ask";

export const UserRoutes = () => {
    const routes = useRoutes([
        {
            path: paths.ROUTE_ROOT,
            children: [
                {
                    element: <LoginLayout />,
                    children: [
                        {
                            path: paths.ROUTE_LOGIN,
                            element: <LoginPage />
                        },
                        {
                            path: paths.ROUTE_JOIN,
                            element: <JoinContainer />
                        },
                        {
                            path: paths.ROUTE_FIND_ACCOUNT,
                            element: <FindAccountContainer />
                        }
                    ]
                },
                {
                    element: <DashBoardLayout />,
                    children: [
                        /** 메인화면 */
                        {
                            path: paths.ROUTE_MAIN,
                            element: <MainPage />
                        },
                        {
                            path: paths.ROUTE_INTRO,
                            element: <IntroMainPage />
                        },
                    ]
                },
                {
                    element: <MainLayout />,
                    children: [
                        {
                            element: <PrivateRoute />,
                            children: [
                                /** 실시간 상담 - 실시간 상담 접수 */
                                {
                                    path: paths.ROUTE_RECEPTION,
                                    element: <ReceptionListPage />
                                },
                                // {
                                //     path: paths.ROUTE_RECEPTION_CREATE,
                                //     element : <ReceptionCreate/>
                                // },
                                /** 실시간 상담 - 실시간 상담 */
                                // {
                                //     path: paths.ROUTE_REALTIME,
                                //     element : <Realtime/>
                                // },
                                /** 묻고답하기 */
                                {
                                    path: paths.ROUTE_ASK_DETAIL,
                                    element: <AskDetailPage />
                                },
                                {
                                    path: paths.ROUTE_ASK_UPDATE,
                                    element: <AskCreatePage />
                                },
                                /** 커뮤니티 - 공지사항 */
                                {
                                    path: paths.ROUTE_NOTICE_CREATE,
                                    element: <NoticeCreatePage />
                                },
                                {
                                    path: paths.ROUTE_NOTICE_UPDATE,
                                    element: <NoticeCreatePage />
                                },
                                /** 마이페이지(보호자) - My질문내역 */
                                {
                                    path: paths.ROUTE_USER_ASK,
                                    element: <UserQuestionListPage />
                                },
                                /** 마이페이지(보호자) - My상담내역 */
                                {
                                    path: paths.ROUTE_USER_CONSULT,
                                    element: <UserConsultListPage />
                                },
                                /** 마이페이지(보호자) - 반려동물 */
                                {
                                    path: paths.ROUTE_USER_PET,
                                    element: <UserPetPage />
                                },
                                /** 마이페이지(보호자) - 계정정보 */
                                {
                                    path: paths.ROUTE_USER_INFO,
                                    element: <UserInfoPage />
                                },
                                // {
                                //     path: paths.ROUTE_USER_INFO_UPDATE,
                                //     element: <UserInfoUpdate />
                                // },
                                /** 마이페이지(수의사) - My답변내역 */
                                {
                                    path: paths.ROUTE_VET_ANSWER,
                                    element: <VetAnswerListPage />
                                },
                                /** 마이페이지(수의사) - My실시간상담내역 */
                                {
                                    path: paths.ROUTE_VET_CONSULT,
                                    element: <VetConsultListPage />
                                },
                                /** 마이페이지(수의사) - 계정정보 */
                                {
                                    path: paths.ROUTE_VET_INFO,
                                    element: <VetInfoPage />
                                },
                                /** 시스템관리 */
                                {
                                    path: paths.ROUTE_SYSTEM,
                                    element: <SystemListPage />
                                },
                            ]
                        },
                        {
                            path: paths.ROUTE_ASK,
                            element: <AskListPage />
                        },
                        {
                            path: paths.ROUTE_NOTICE,
                            element: <NoticeListPage />
                        },
                        {
                            path: paths.ROUTE_NOTICE_DETAIL,
                            element: <NoticeDetailPage />
                        },
                        /** 커뮤니티 - 자주묻는 질문 */
                        {
                            path: paths.ROUTE_FAQ,
                            element: <FaqListPage />
                        },
                    ]
                },
                {
                    element: <FullScreenLayout />,
                    children: [
                        {
                            path: paths.ROUTE_REALTIME,
                            element: <Realtime />
                        }
                    ]
                }
            ]
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]);

    // element를 return함으로써 적절한 계층으로 구성된 element가 렌더링 될 수 있도록 함
    return routes;
};
