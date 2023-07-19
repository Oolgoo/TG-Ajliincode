import { UserOutlined } from "@ant-design/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Input, message } from "antd"
import { userDataAtom } from "common";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { registAnsFn } from "../apis";
import { AnsRegistParams } from "../types/ansTypes";

interface AnsCreateProps {
    ansData?: any;
    ansState: (yn: boolean) => void;
    qustnNo: number;
}
export const AnsCreate = (props: AnsCreateProps) => {
    const { ansData, ansState, qustnNo } = props;
    const queryClient = useQueryClient();

    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    const [ansCn, setAnsCn] = useState<string | undefined>('');

    const handleFinish = () => {
        //저장
        registAns({
            params: {
                answNo: ansData ? ansData.answNo : undefined,
                qustnNo: qustnNo,
                answCn: ansCn
            },
            files: undefined
        })
    }

    const { mutate: registAns, isLoading } = useMutation(
        (params: AnsRegistParams) => registAnsFn(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAskDetail'], });
                ansState(false);
            },
            onError: (error: any) => {
                if (Array.isArray((error as any).response.data.error)) {
                    (error as any).response.data.error.forEach((el: any) =>
                        message.error(el.message)
                    );
                } else {
                    message.error((error as any).response.data.message);
                }
            },
        }
    );

    useEffect(() => {
        setAnsCn(ansData?.answCn);
    }, [ansData])

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
                                        {ansData ? ansData.nickNm : userData.name} 수의사
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
                                            {ansData?.regDt ? ansData?.regDt : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: 10,
                            }}
                        >
                            <Input.TextArea
                                style={{
                                    minHeight: 120
                                }}
                                value={ansCn}
                                onChange={e => setAnsCn(e.target.value)}
                            />
                        </div>
                        <div style={{ float: 'right' }}>
                            <Button
                                type="primary"
                                size="middle"
                                style={{
                                    width: 60,
                                    marginRight: 5,
                                }}
                                onClick={() => handleFinish()}
                            >
                                등록
                            </Button>
                            <Button
                                onClick={
                                    () => ansState(false)
                                }
                            >취소</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}