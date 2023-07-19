import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { MoreAnsRegistParams } from "../types/ansTypes";
import { registMoreAnsFn } from "../apis";

interface MoreAnsCreateProps {
    addQustnNo?: number;
    moreAnsData: any;
    moreAnsState: (yn: boolean) => void;
}

export const MoreAnsCreate = (props: MoreAnsCreateProps) => {
    const { addQustnNo, moreAnsData, moreAnsState } = props;

    const queryClient = useQueryClient();

    const [moreAnsCn, setMoreAnsCn] = useState<string>('');

    const handleFinish = () => {
        if (addQustnNo) {
            registMoreAns({
                addAnswNo: moreAnsData ? moreAnsData.addAnswNo : undefined,
                addQustnNo: addQustnNo,
                answCn: moreAnsCn
            })
        }
    }

    useEffect(() => {
        if (moreAnsData) {
            setMoreAnsCn(moreAnsData?.answCn);
        }
    }, [moreAnsData])

    const { mutate: registMoreAns, isLoading } = useMutation(
        (params: MoreAnsRegistParams) => registMoreAnsFn(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAskDetail'], });
                moreAnsState(false);
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
                                width: '50%',
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
                                    moreAnsData?.regDt
                                }
                            </span>
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
                        <Input.TextArea
                            style={{
                                minHeight: 120,
                            }}
                            value={moreAnsCn}
                            onChange={e => setMoreAnsCn(e.target.value)}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
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
                            () => moreAnsState(false)
                        }
                    >취소</Button>
                </div>
            </div>
        </>
    )
}