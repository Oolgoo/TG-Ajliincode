import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Form, Input, UploadFile, Image, Space, message } from "antd";
import { FileUpload, MainContentHeader, PetTagItem, userDataAtom } from "common";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as yup from 'yup';
import { getAskDetailFn, registAskFn } from "../apis";
import readyImg from 'assets/img/imgReady.jpg';
import { petSelectSymptAtom } from "common/components/PetMng/petRercoil";
import { AskRegistParams } from "../types";
import { ROUTE_ASK } from "routes/const";
import { AskTypSelectModal } from "../components";
import common from 'assets/img/survey/common.png';
import { getSympNm } from "lib/sympData";

const askSchema = yup.object().shape({
    qustnTtl: yup.string().required('질문 제목을 작성해주세요.'),
    sympDtlCn: yup
        .string()
        .required('내용을 입력해주세요.')
        .max(3000, '내용은 최대 3000자 까지 입력 가능합니다.'),
});

const yupSync = {
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    async validator({ field }: any, value: any) {
        await askSchema.validateSyncAt(field, { [field]: value });
    },
};
const content = `반려동물에 대해 모든 걸 물어보세요! ANIWIDE의 수의사 분들께서 답변해 주실 거에요!`;

const AskCreate = () => {
    const { id: qustnNo } = useParams<{ id: string }>();

    const queryClient = useQueryClient();

    const [symptSelect, setSymptSelect] = useRecoilState(petSelectSymptAtom);
    //session userData Atom
    const [userData,] = useRecoilState(userDataAtom);

    const [typSelectView, setTypSelectView] = useState<boolean>(false);

    const navigate = useNavigate();

    //첨부파일 리스트
    const [askFileList, setAskFileList] = useState<UploadFile[] | []>();

    const [form] = Form.useForm();
    const [imgUrl, setImgUrl] = useState<string>();

    const onFinish = async (value: any) => {
        if (data?.petData.petNo && qustnNo) {
            registAns({
                params: {
                    qustnNo: Number(qustnNo),
                    petNo: data?.petData.petNo,
                    qustnTtl: value.qustnTtl,
                    sympTypCd: symptSelect ? symptSelect : '01',
                    sympKeywd: value.qustnTtl,
                    sympDtlCn: value.sympDtlCn,
                    delYn: 'N'
                },
                files: undefined
            })
        }
    }
    // React Query 상세 조회
    const { isLoading, data } = useQuery([
        'getAskDetail', qustnNo, { staleTime: 1200000 } //refetch 시간 20분으로 설정
    ], () => getAskDetailFn(qustnNo), {
        retry: 1
    });

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data.detail,
            });
            if (data?.petData?.fileList) {
                setImgUrl(data?.petData?.fileList[0]?.srcPath);
            }
            setSymptSelect(data.detail.sympTypCd);
        }
    }, [data])

    const { mutate: registAns } = useMutation(
        (params: AskRegistParams) => registAskFn(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAskDetail', 'getAskAll', 'getAskRec'], });
                navigate(ROUTE_ASK, { replace: true });
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
            <MainContentHeader title={`묻고 답하기`} content={content} />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #eeece4',
                    borderTop: '1px solid #eeece4',
                    marginTop: 20,
                    marginBottom: 20,
                    alignItems: 'end'
                }}
            >
                <div
                    style={{
                        width: '10%',
                        padding: 20,
                    }}
                >
                    <Image
                        style={{
                            borderRadius: 10,
                            border: '1px solid #aaa',
                        }}
                        src={
                            imgUrl ? imgUrl : readyImg
                        }
                    />
                </div>
                <div
                    style={{
                        width: '90%',
                        paddingBottom: 20
                    }}
                >
                    <div
                        style={{
                            padding: '10px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: '#595960',
                        }}
                    >
                        {data?.petData.petNm}
                    </div>
                    <div
                        style={{
                            padding: '5px',
                        }}
                    >
                        <Space
                            key="action"
                            size={[0, 8]}
                            wrap
                        >
                            <PetTagItem
                                bred={data?.petData.bred}
                                gndrCd={data?.petData.gndrCd}
                                neutYn={data?.petData.neutYn}
                                age={data?.petData.age}
                                wght={data?.petData.wght}
                            />
                        </Space>
                    </div>
                </div>
            </div>

            <Form form={form} onFinish={onFinish}>
                <div
                    style={{
                        borderRadius: 15,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        width: '30%',
                        marginBottom: 15,
                        border: '1px solid #e3e3e3',
                        padding: '5px 10px'

                    }}
                    onClick={() => setTypSelectView(true)}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '4rem',
                            textAlign: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F9F1BB',
                            borderRadius: 100
                        }}>
                        <img
                            src={common}
                            style={{ width: '4rem', height: 'auto', padding: 10 }}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: '1.3rem',
                            fontWeight: 600,
                            marginLeft: 20
                        }}
                    >
                        {getSympNm(symptSelect)} 문제
                    </div>
                </div>
                <Form.Item name="qustnTtl" rules={[yupSync]}>
                    <Input
                        maxLength={50}
                        placeholder="질문 제목을 작성해주세요."
                    />
                </Form.Item>

                <Form.Item name="sympDtlCn" rules={[yupSync]}>
                    <Input.TextArea
                        maxLength={3000}
                        placeholder="내용은 최대 3000자까지 입력 가능합니다."
                        style={{ resize: 'none', height: 200 }}
                    />
                </Form.Item>

                <FileUpload
                    fileList={askFileList}
                    checkUpdate={qustnNo ? true : false}
                    setFileList={(value) => setAskFileList(value)}
                    queryKey="getNotice"
                />
                <Divider />

                <div style={{ float: 'right' }}>
                    <Form.Item>
                        <Button
                            type="primary"
                            size="middle"
                            htmlType="submit"
                            style={{
                                width: 60,
                                marginRight: 5,
                            }}
                        >
                            저장
                        </Button>
                        <Button onClick={() => navigate(-1)}>취소</Button>
                    </Form.Item>
                </div>
            </Form>
            {
                typSelectView && (
                    <AskTypSelectModal
                        open={typSelectView}
                        closeModal={() => setTypSelectView(false)}
                    />)
            }
        </>
    )
}
export default AskCreate;