import React from "react";
import { Button, message, Upload, UploadFile } from "antd";
import styled from "styled-components";
import { InboxOutlined } from "@ant-design/icons";
import { deleteFileFn } from "../../../common/apis/commonApi";
import { checkFullSize, fileSizeMB, getAllFileSize } from "../../../lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { Dragger } = Upload;

const StyledDragger = styled(Dragger)`
    .ant-upload-list-item-container {
        float: left;
        width: 200px;
        margin-inline-end: 8px;
    }
`

interface FileUploadProps {
    fileList: UploadFile[] | undefined;
    checkUpdate: boolean;
    setFileList: (file: any) => void;
    queryKey: string;
}

export const FileUpload = (props: FileUploadProps) => {
    const { fileList, checkUpdate, setFileList, queryKey } = props;

    const queryClient = useQueryClient();

    //전체파일 삭제
    const removeAllFile = async () => {
        if (fileList) {
            const deleteFile = fileList?.filter(e => e.fileName === 'old');
            if (deleteFile.length !== 0) {
                const fileList: any = deleteFile?.map(file => file.originFileObj);
                for (let i = 0; i < deleteFile.length; i++) {
                    const fileNo = fileList[i].fileNo;
                    await deleteFileFn({ 'fileNo': Number(fileNo) });
                }
            }
        }
        setFileList([]);
    }

    const removeOneFile = async (value: any) => {
        if (value.fileName === 'old') {
            const fileNo = value.originFileObj.fileNo;
            deleteFile(fileNo)
        }
    }

    const handleFileChange =( value: UploadFile[]) =>{
        if(checkFullSize(value)){
            setFileList(value);
        }else{
            message.error(`파일을 최대 10MB까지만 첨부할수 있습니다. 파일 용량을 확인해주세요.`);
        }
    }

    const { mutate: deleteFile } = useMutation((fileNo: number) => deleteFileFn({'fileNo': fileNo}),{
        onSuccess: () => {
            // 삭제 완료 후 목록 재 조회
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
        onError: (error: any) => {
            if (Array.isArray((error as any).response.data.error)) {
                (error as any).response.data.error.forEach((el: any) =>
                    message.error(el.message)
                );
            } else {
                message.error((error as any).response.data.message)
            }
        }
    });

    return (
        <>
            <div style={{width: '100%', display: 'inline-block'}}>
                <Upload
                    multiple={true}
                    maxCount={10}
                    showUploadList={false}
                    beforeUpload={() => false}
                    fileList={fileList}
                    defaultFileList={fileList}
                    onChange={(value) => {
                        handleFileChange(value.fileList)
                    }}
                    onRemove={(value) => {
                        removeOneFile(value)
                    }}
                >
                    <Button
                        type='primary'
                        size='middle'
                        style={{
                            width: 130,
                            marginTop: 5,
                            marginRight: 5,
                        }}
                    >
                        파일 첨부하기
                    </Button>
                </Upload>
                <div style={{ display: "inline-block" }}>
                    <Button
                        size='middle'
                        style={{
                            width: 100,
                            marginRight: 10
                        }}
                        onClick={() =>
                            checkUpdate ? removeAllFile() : setFileList([])
                        }
                    >
                        모두 삭제
                    </Button>
                    <span>
                        *파일을 최대 10개 까지 등록 가능합니다.
                    </span>
                </div>
                <div style={{marginTop: 10, float: "right"}}>
                    <span ><strong>{fileSizeMB(getAllFileSize(fileList))}</strong>/10MB (※ 최대 10MB까지 등록 가능합니다.)</span>
                </div>
            </div>
            <div style={{ marginTop: 10 }}>
                <StyledDragger
                    multiple={true}
                    maxCount={10}
                    listType={'picture'}
                    showUploadList={true}
                    beforeUpload={() => false}
                    fileList={fileList}
                    defaultFileList={fileList}
                    onChange={(value) => {
                        setFileList(value?.fileList);
                    }}
                    onRemove={(value) => {
                        removeOneFile(value)
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text" style={{ paddingBottom: 20 }}>여러 개의 파일을 마우스로 끌어놓으세요.</p>
                </StyledDragger>
            </div>
        </>
    )
}