import { DeleteOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm } from "antd";
import { AnsResponse } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteAnsFn } from "../apis";
import { useRecoilState } from "recoil";
import { userDataAtom } from "common";
import { ansAddStateAtom } from "../recoils/ansRecoil";

interface AskAnsDetailProps {
    ansData: AnsResponse;
}

export const AskAnsDetail = (props: AskAnsDetailProps) => {
    const { ansData } = props;

    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    const queryClient = useQueryClient();

    //답변 등록 상태
    const [, setAddAns] = useRecoilState(ansAddStateAtom);

    //삭제 컨펌
    const [openConfirm, setOpenConfirm] = useState(false);

    const { mutate } = useMutation((answNo: number) => deleteAnsFn({ 'answNo': answNo }), {
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
        mutate(Number(ansData.answNo));
    };

    const deleteCancel = () => {
        setOpenConfirm(false);
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                }}
            >
                <div
                    style={{
                        width: '6%',
                        minWidth: 60,
                        textAlign: 'center',
                        padding: 5,
                    }}
                >
                    <Avatar
                        size={46}
                        icon={<UserOutlined />}
                        src={`https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_5%2F1682295752057wlsBN_JPEG%2Fb4f76b9287f69eb38c228e3a946fbb75.jpg`}
                    />
                </div>

                <div
                    style={{
                        width: '100%'
                    }}>
                    <div
                        style={{
                            padding: 10,
                            borderRadius: 5,
                        }}
                    >
                        <div
                            style={{
                                padding: 10,
                                marginBottom: 5,
                                borderBottom: '1px solid #eeece4',
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
                                            fontWeight: 600,
                                        }}
                                    >
                                        {ansData?.nickNm} 수의사
                                    </span>
                                    <span
                                        style={{
                                            marginLeft: 15,
                                            fontSize: '12px',
                                        }}
                                    >
                                        내과 전문
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
                                                color: '#999'
                                            }}
                                        >
                                            {ansData?.regDt}
                                        </span>
                                        {
                                            ansData.regId === userData?.id
                                            && (<>
                                                <span
                                                    onClick={() => setAddAns(true)}
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
                        <div
                            style={{
                                minHeight: 150,
                                padding: 10,
                            }}
                        >
                            {ansData?.answCn}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}