import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { MoreAskRegistParams } from "../types";
import { registMoreAskFn } from "../apis";

interface MoreAskCreateProps {
    moreAskData: any;
    moreAskState: (yn: boolean) => void;
    qustnNo: number;
}
export const MoreAskCreate = (props: MoreAskCreateProps) => {
    const { moreAskData, moreAskState, qustnNo } = props;

    const queryClient = useQueryClient();
    
    const [moreAskCn, setMoreAskCn] = useState<string>('');

    const handleFinish = () => {
        registMoreAsk({
                addQustnNo: moreAskData ? moreAskData.addQustnNo : undefined,
                qustnNo: qustnNo,
                addQustnCn: moreAskCn
            })
    }

    useEffect(() => {
        if (moreAskData) {
            setMoreAskCn(moreAskData.addQustnCn);
        }
    }, [moreAskData])

    const { mutate: registMoreAsk, isLoading } = useMutation(
        (params: MoreAskRegistParams) => registMoreAskFn(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAskDetail'], });
                moreAskState(false);
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
                            <span
                                style={{
                                    float: 'right',
                                    color: '#999',
                                    padding: '8px 0',
                                }}
                            >
                                {
                                    moreAskData?.regDt
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: '#F2F2F3',
                        borderRadius: 10,
                        minHeight: 100,
                        padding: 10,
                        marginLeft: 25,
                    }}
                >
                    <Input.TextArea
                        style={{
                            minHeight: 120,
                        }}
                        value={moreAskCn}
                        onChange={e => setMoreAskCn(e.target.value)}
                    />
                </div>
                <div
                    style={{
                        display:'flex',
                        justifyContent: 'end',
                        paddingBottom: 10,
                        marginTop: 10,
                        borderBottom: '1px solid #e0dccc',
                    }}>
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
                            () => moreAskState(false)
                        }
                    >취소</Button>
                </div>
            </div>
        </>
    )
}