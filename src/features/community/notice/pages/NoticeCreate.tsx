import React from 'react';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Descriptions,
    Divider,
    Form,
    Input,
    Radio,
    Row,
    UploadFile,
    message,
} from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { setCredentials } from 'features/auth';
import { ROUTE_NOTICE } from 'routes/const';
import { NoticeRegistParams } from '../types';
import { getNoticeFn, registNoticeFn } from '../apis';
import { FileUpload, MainContentHeader, PageLoader } from 'common';

const noticeSchema = yup.object().shape({
    ntcNm: yup.string().required('제목을 입력해주세요.'),
    ntcCn: yup
        .string()
        .required('내용을 입력해주세요.')
        .max(3000, '내용은 최대 3000자 까지 입력 가능합니다.'),
});

const yupSync = {
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    async validator({ field }: any, value: any) {
        await noticeSchema.validateSyncAt(field, { [field]: value });
    },
};

const NoticeCreate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id: ntcNo } = useParams<{ id: string }>();

    const [form] = Form.useForm();

    const loginUser = useRecoilValue(setCredentials);

    //기간설정
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();

    //종료일 기간 있는지 확인
    const [checkLimit, setCheckLimit] = useState<boolean>(false);

    //첨부파일 리스트
    const [ntcFileList, setNtcFileList] = useState<UploadFile[] | []>();

    const { mutate: registNotice, isLoading } = useMutation(
        (params: NoticeRegistParams) => registNoticeFn(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllNotices'] });
                navigate(ROUTE_NOTICE);
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

    // 등록 실행
    const onFinish = async (value: any) => {
        if (value.mainExpsrYn === 'Y') {
            if (!startDate) {
                message.error('시작일을 설정해주세요.');
                return;
            } else if (!checkLimit) {
                if (!endDate) {
                    message.error('종료일을 설정해주세요.');
                    return;
                }
            }
        }

        const params = {
            params: {
                ntcNo: !!ntcNo ? Number(ntcNo) : undefined,
                ntcNm: value.ntcNm,
                ntcCn: value.ntcCn,
                mainExpsrYn: value.mainExpsrYn,
                mainExpsrBgngDt: startDate,
                mainExpsrEndDt: endDate ?? undefined,
                mainExpsrLmtYn: checkLimit ? 'N' : 'Y',
                delYn: 'N',
            },
            files: ntcFileList ?? [],
        };

        registNotice(params);
    };

    // 상세 목록 조회
    const { data } = useQuery(['getNotice', ntcNo], () => getNoticeFn(ntcNo), {
        // ntcNo 값이 있을 경우 조회
        enabled: !!ntcNo,
    });

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data.detail,
            });

            setStartDate(data.detail.mainExpsrBgngDt);
            setEndDate(data.detail.mainExpsrEndDt);

            const files = data.file.map((file) => {
                return {
                    uid: file.fileId,
                    size: file.fileSize,
                    fileName: 'old',
                    name: file.fileNm,
                    type: 'text/plain',
                    originFileObj: file,
                };
            });
            setNtcFileList(files as unknown as UploadFile[]);
        }
    }, [data]);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <MainContentHeader
                title={`공지사항`}
                content={`공지사항에 대해 블라블라。`}
            />

            <Form form={form} onFinish={onFinish}>
                <Descriptions column={4} bordered>
                    <Descriptions.Item
                        span={2}
                        label="작성자명"
                        labelStyle={{
                            width: '15%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                        contentStyle={{
                            width: '20%',
                        }}
                    >
                        <span>{loginUser.name}</span>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={2}
                        label="작성자 ID"
                        labelStyle={{
                            width: '15%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                        contentStyle={{
                            width: '42%',
                        }}
                    >
                        <span>{loginUser.id}</span>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={2}
                        label="노출여부"
                        labelStyle={{
                            width: '15%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                        contentStyle={{
                            width: '20%',
                        }}
                    >
                        <Form.Item
                            noStyle
                            name="mainExpsrYn"
                            initialValue={'Y'}
                        >
                            <Radio.Group>
                                <Radio value="Y"> 노출 </Radio>
                                <Radio value="N"> 미노출 </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={2}
                        label="메인노출기간"
                        labelStyle={{
                            width: '15%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                        contentStyle={{
                            width: '42%',
                        }}
                    >
                        <Form.Item noStyle>
                            <DatePicker
                                format={'YYYY-MM-DD'}
                                value={
                                    startDate
                                        ? dayjs(startDate, 'YYYY-MM-DD')
                                        : null
                                }
                                onChange={(date) =>
                                    setStartDate(date?.format('YYYY-MM-DD'))
                                }
                            />
                        </Form.Item>
                        <span style={{ marginLeft: 10, marginRight: 10 }}>
                            ~
                        </span>
                        <Form.Item noStyle>
                            <DatePicker
                                format={'YYYY-MM-DD'}
                                value={
                                    endDate
                                        ? dayjs(endDate, 'YYYY-MM-DD')
                                        : null
                                }
                                disabled={checkLimit}
                                onChange={(date) =>
                                    setEndDate(date?.format('YYYY-MM-DD'))
                                }
                            />
                        </Form.Item>
                        <Checkbox
                            style={{
                                marginLeft: 10,
                            }}
                            checked={checkLimit}
                            onChange={() => setCheckLimit(!checkLimit)}
                        >
                            종료일 제한 없음
                        </Checkbox>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="제목"
                        labelStyle={{
                            width: '15%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                        contentStyle={{
                            width: '35%',
                        }}
                    >
                        <Form.Item name="ntcNm" rules={[yupSync]}>
                            <Input
                                maxLength={50}
                                placeholder="공지사항 제목을 작성해주세요."
                            />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="내용"
                        labelStyle={{
                            width: '15%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                        contentStyle={{
                            width: '35%',
                        }}
                    >
                        <Form.Item name="ntcCn" rules={[yupSync]}>
                            <Input.TextArea
                                maxLength={3000}
                                placeholder="내용은 최대 3000자까지 입력 가능합니다."
                                style={{ resize: 'none', height: 200 }}
                            />
                        </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item
                        span={4}
                        label="파일첨부"
                        labelStyle={{
                            width: '15%',
                            fontWeight: 600,
                            backgroundColor: '#f5f5f5',
                            textAlign: 'center',
                        }}
                        contentStyle={{
                            width: '35%',
                        }}
                    >
                        <FileUpload
                            fileList={ntcFileList}
                            checkUpdate={ntcNo ? true : false}
                            setFileList={(value) => setNtcFileList(value)}
                            queryKey="getNotice"
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Divider
                    style={{ marginTop: '0.8rem', marginBottom: '0.5rem' }}
                />
                <Row>
                    <Col span={24}>
                        <Form.Item style={{ float: 'right' }}>
                            <Button
                                type="primary"
                                size="middle"
                                style={{
                                    width: 60,
                                    marginRight: 5,
                                }}
                                htmlType="submit"
                            >
                                {ntcNo ? '수정' : '등록'}
                            </Button>
                            <Button
                                size="middle"
                                style={{
                                    width: 60,
                                }}
                                onClick={() => {
                                    navigate(ROUTE_NOTICE);
                                }}
                            >
                                목록
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default NoticeCreate;
