import { PageLoader, PetTagItem, usePagination } from "common";
import { useRecoilState } from "recoil";
import { askAllFilter } from "../recoils";
import { getAskAllFn } from "../apis";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { List, Space, message, Image } from 'antd';
import styled from "styled-components";
import React from "react";
import { LikeOutlined } from "@ant-design/icons";
import { ROUTE_ASK_DETAIL_WITH_ID } from "routes/const";
import { useNavigate } from "react-router-dom";
import { getSympNm } from "lib/sympData";
import readyImg from 'assets/img/imgReady.jpg';

const StyleDiv = styled.div`
    /* border-bottom: 1px solid #eee; */
    cursor: pointer;
    &:hover {
        /* background: #eee; */
    }
`;

//전체 질문 목록 Componenet
export const AskAllList = () => {
    //router navigate
    const navigate = useNavigate();

    // 검색 필터 
    const [filter, setFilter] = useRecoilState(askAllFilter);

    // React Query 목록 조회
    const { isLoading, isError, data, error, refetch } = useQuery([
        'getAskAll', filter], () => getAskAllFn(filter), {
        retry: 0
    });

    // 검색조회
    const handleSearch = (values: { [key: string]: any }) => {
        const { dateRange, key, word, dateType } = values;

        setFilter({
            ...filter,
            pageNo: 1,
            itemsPerPage: 10,
            dateType: dateType ?? undefined,
            startDt: dateRange ? dateRange[0] : undefined,
            endDt: dateRange ? dateRange[1] : undefined,
            searchType: key,
            searchValue: word
        })
    }

    // 페이지당 갯수
    const { pagination, onChangePageSize } = usePagination({
        totalElement: data?.value.totalCount ?? 0,
        // totalElement:  0,
        onChangePagination: (page, pageSize) => {
            setFilter({
                ...filter,
                pageNo: page,
                itemsPerPage: pageSize
            });
        }
    });

    // 에러
    useEffect(() => {
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    message.error(el.message)
                );
            } else {
                message.error((error as any).response.data.message)
            }
        }
    }, [isLoading]);

    // 초기화 시 refetch
    useEffect(() => {
        refetch();
    }, [filter]);

    const handleReset = () => {
        setFilter({
            pageNo: 1,
            itemsPerPage: 10
        });
    };

    if (isLoading) {
        return <PageLoader />;
    }

    //custom Design
    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const handleAskitem = (qustnNo: number) => {
        navigate(ROUTE_ASK_DETAIL_WITH_ID(qustnNo));
    }

    return (
        <>
            {/* <SearchBar
                searchDateType="writeDate"
                onReset={handleReset}
                onSearch={handleSearch}
                searchTypes={[
                {
                    key: 'NTCTTL',
                    name: '제목'
                }, {
                    key: 'MBRNM',
                    name: '작성자'
                }
                ]}
            /> */}

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    position: 'bottom',
                    align: 'center',
                }}
                dataSource={data?.value.pages ?? []}
                renderItem={(item) => (
                    <StyleDiv
                        onClick={() => {
                            handleAskitem(item.qustnNo);
                        }}
                    >
                        <div
                            style={{
                                borderBottom: '1px solid #e9e9e9',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                style={{
                                    width: '15%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        width: 130,
                                        padding: 15,
                                    }}
                                >
                                    <Image
                                        style={{
                                            borderRadius: 10,
                                            border: '1px solid #aaa',
                                        }}
                                        src={
                                            (item?.sympFileList && item?.sympFileList[0]) ?
                                                item?.sympFileList[0]?.fullSrcPath : readyImg
                                        }
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    width: '85%',
                                }}
                            >
                                <List.Item
                                    key={item.qustnTtl}
                                    style={{
                                        padding: 15,
                                    }}
                                    actions={[
                                        <Space
                                            key="action"
                                            size={[0, 8]}
                                            wrap
                                        >
                                            <PetTagItem
                                                bred={item?.bred}
                                                gndrCd={item?.gndrCd}
                                                neutYn={item?.neutYn}
                                                age={item?.age}
                                                wght={item?.wght}
                                            />
                                        </Space>,
                                        <IconText
                                            icon={LikeOutlined}
                                            text={item.likeCnt + ''}
                                            key="list-vertical-like-o"
                                        />,
                                        // <IconText
                                        //     icon={MessageOutlined}
                                        //     text={}
                                        //     key="list-vertical-message"
                                        // />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div style={{ margin: 0, width: '100%' }}>{item.qustnTtl}
                                                        <span
                                                            style={{
                                                                fontSize: 13,
                                                                padding: '5px 15px',
                                                                color: '#E79C0D',
                                                                backgroundColor: '#FCF5E6',
                                                                borderRadius: 15,
                                                                border: 'solid 1px #FCDB95',
                                                                width: '10%',
                                                                marginLeft: 5
                                                            }}
                                                        >
                                                            {getSympNm(item.sympTypCd)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        description={item.sympDtlCn}
                                    />
                                    {/* {item.userContent} */}
                                </List.Item>
                            </div>
                        </div>
                    </StyleDiv>
                )}
            />
        </>
    )
}