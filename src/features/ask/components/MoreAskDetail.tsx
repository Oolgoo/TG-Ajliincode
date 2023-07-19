import { useRecoilState } from "recoil";
import { MoreAskResponse } from "../types";
import { userDataAtom } from "common";
import { addMoreAskStateAtom } from "../recoils";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteMoreAskFn } from "../apis";
import { toast } from "react-toastify";

interface MoreAskDetaiProps {
    moreAskData: MoreAskResponse;
}
export const MoreAskDetail = (props: MoreAskDetaiProps) => {
    const { moreAskData } = props;

    const queryClient = useQueryClient();
    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    //추가 질문 등록 상태
    const [, setAddMoreAsk] = useRecoilState(addMoreAskStateAtom);

    //삭제 컨펌
    const [openConfirm, setOpenConfirm] = useState(false);

    const { mutate } = useMutation((addQustnNo: number) => deleteMoreAskFn({ 'addQustnNo': addQustnNo }), {
        onSuccess: () => {
            // 삭제 완료 후
            queryClient.invalidateQueries({ queryKey: ['getAskDetail'] });
        },
        onError: (error: any) => {
            if (Array.isArray((error as any).response.data.error)) {
                (error as any).response.data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).response.data.message, {
                    position: 'top-right',
                });
            }
        }
    });

    const deleteConfirm = async () => {
        mutate(Number(moreAskData.addQustnNo));
    };

    const deleteCancel = () => {
        setOpenConfirm(false);
    };


    return (
        <>
            <div
                style={{
                    minHeight: 150,
                    padding: 5,
                }}
            >
                <div
                    style={{
                        minHeight: 30,
                        marginBottom: 5,
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
                                width: '50%',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 26,
                                    fontWeight: 600,
                                    color: '#999',
                                }}
                            >
                                Q.
                            </span>
                            <span
                                style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: '#999',
                                }}
                            >
                                &nbsp;추가 질문
                            </span>
                        </div>
                        <div
                            style={{
                                width: '50%',
                            }}
                        >
                            <div
                                style={{
                                    float: 'right',
                                }}
                            >
                                <span
                                    style={{
                                        color: '#999',
                                        padding: '8px 0',
                                    }}
                                >
                                    {
                                        moreAskData.regDt
                                    }
                                </span>
                                {
                                    moreAskData.regId === userData?.id
                                    && (<>
                                        <span
                                            onClick={() => setAddMoreAsk(true)}
                                            style={{
                                                marginLeft: 15,
                                                cursor: 'pointer',
                                                color: '#ffdb4d'
                                            }}><FormOutlined /></span>
                                        <Popconfirm
                                            title="정말 삭제하시겠습니까?"
                                            description="삭제 시 복구할 수 없습니다."
                                            open={openConfirm}
                                            onConfirm={deleteConfirm}
                                            onCancel={deleteCancel}
                                        >
                                            <span
                                                onClick={() => setOpenConfirm(true)}
                                                style={{
                                                    marginLeft: 10,
                                                    cursor: 'pointer',
                                                    color: '#d84242'
                                                }}>
                                                <DeleteOutlined />
                                            </span>
                                        </Popconfirm>
                                    </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            backgroundColor: '#F2F2F3',
                            borderRadius: 10,
                            minHeight: 100,
                            padding: 10,
                            marginLeft: 25,
                        }}
                    >
                        {
                            moreAskData.addQustnCn
                        }
                    </div>
                </div>
            </div>
        </>
    )
}