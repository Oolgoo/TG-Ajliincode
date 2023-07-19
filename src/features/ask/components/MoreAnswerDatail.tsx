import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { MoreAnsResponse } from "../types/ansTypes";
import { Popconfirm } from "antd";
import { useRecoilState } from "recoil";
import { userDataAtom } from "common";
import { addMoreAnsStateAtom } from "../recoils/ansRecoil";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteMoreAnsFn } from "../apis";

interface MoreAnsDetailProps {
    moreAnsData: MoreAnsResponse;
}
export const MoreAnswerDatail = (props: MoreAnsDetailProps) => {
    const { moreAnsData } = props;


    const queryClient = useQueryClient();

    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    //추가 답변 등록 상태
    const [, setAddMoreAns] = useRecoilState(addMoreAnsStateAtom);

    //삭제 컨펌
    const [openConfirm, setOpenConfirm] = useState(false);


    const deleteConfirm = async () => {
        mutate(Number(moreAnsData.addAnswNo));
    };

    const deleteCancel = () => {
        setOpenConfirm(false);
    };

    const { mutate } = useMutation((addAnswNo: number) => deleteMoreAnsFn({ 'addAnswNo': addAnswNo }), {
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

    return (
        <>
            <div
                style={{
                    minHeight: 150,
                    marginBottom: 5,
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
                                width: '70%',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 26,
                                    fontWeight: 600,
                                    color: '#F5C523',
                                }}
                            >
                                A.
                            </span>
                            <span
                                style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: '#F5C523',
                                }}
                            >
                                &nbsp;수의사 답변
                            </span>
                        </div>
                        <div
                            style={{
                                width: '30%',
                            }}
                        >
                            <div
                                style={{
                                    float: 'right',
                                }}>
                                <span
                                    style={{
                                        color: '#999',
                                        padding: '8px 0',
                                    }}
                                >
                                    {
                                        moreAnsData?.regDt
                                    }
                                </span>
                                {
                                    moreAnsData?.regId === userData?.id
                                    && (<>
                                        <span
                                            onClick={() => setAddMoreAns(true)}
                                            style={{
                                                marginLeft: 10,
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
                            moreAnsData.answCn
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
