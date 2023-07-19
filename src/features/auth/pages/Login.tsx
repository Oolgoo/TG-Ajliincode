import React from 'react';
import { Button, Divider, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';
// import naver from 'assets/img/login/naver/btnG.png';
// import kakao from 'assets/img/login/kakao/kakao_symbol.png';
// import google from 'assets/img/login/google/google_symbol.png';
import { AuthParams } from '../types';
import { loginUserFn } from '../apis';
import { setCredentials } from '../recoils';
import { ROUTE_FIND_ACCOUNT, ROUTE_JOIN, ROUTE_MAIN } from 'routes/const';
import { PageLoader } from 'common';
import { encrypt } from 'lib';

const Login = () => {

    const loginSchema = yup.object().shape({
        userId: yup
            .string()
            .required('아이디를 입력해주세요.'),
        password: yup
            .string()
            .required('비밀번호를 입력해주세요.')
            .max(15, '비밀번호는 15자리 이하여야 합니다.')
            .min(4, '비밀번호는 4자리 이상이어야 합니다.'),
    });
    
    const yupSync = {
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        async validator({ field }: any, value: any) {
            await loginSchema.validateSyncAt(field, { [field]: value });
        }
    };

    const [form] = Form.useForm();

    const navigate = useNavigate();
    const setUserInfo = useSetRecoilState(setCredentials);

    const env = `${process.env.REACT_APP_ENV}`;

    const goMain =(data:any) =>{
        navigate(ROUTE_MAIN,{ replace: true});
        setUserInfo(data.value.detail);
    }

    const { mutate: loginUser, isLoading } = useMutation(
        (user: AuthParams) => loginUserFn(user),
        {
            onSuccess: (data) => {
                sessionStorage.setItem("accessToken", data.value.token.accessToken);
                sessionStorage.setItem("userData",JSON.stringify(data.value.detail))
                if (env === "dev") sessionStorage.setItem("refreshToken", data.value.token.refreshToken);
                goMain(data);
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
        }
    );

    const handleLoginClick = async (value: AuthParams) => {
        loginUser({
            userId: value.userId,
            password: encrypt(value.password)
        });
    };

    if (isLoading) {
        return <PageLoader />;
    }

    // const [joinStep, setJoinStep] = useRecoilState(joinStepAtom);

    // const [findState, setFindState] = useRecoilState<string>(findStateAtom);
    
    return (
        <div className={'section-division'}
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem'
            }}
        >
            <div style={{
                width: '40rem',
            }}
            >
                <p style={{ fontSize: '2em', fontWeight: 600 }}>로그인</p>
                <hr/>
                <Form
                    form={form}
                    onFinish={value => {handleLoginClick(value)}}
                    style={{marginTop: '2rem', width: '80%', marginLeft: '10%', marginRight: '10%'}}
                >
                    <Form.Item
                        name="userId"
                        rules={[yupSync]}
                    >
                        <Input
                            autoFocus={true}
                            placeholder="ID"
                            style={{
                                height: '3.3em',
                                borderRadius: '5px',
                                marginBottom: 10
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[yupSync]}
                    >
                        <Input.Password
                            type='password'
                            placeholder="PASSWORD"
                            name='password'
                            style={{
                                height: '3.3em',
                                borderRadius: '5px',
                            }}
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item >
                        <Button
                            type="text"
                            htmlType="submit"
                            block
                            className="btn-round mb-3"
                            style={{
                                height: '2.3em',
                                borderRadius: '5px',
                                fontSize: 20,
                                border: '1px solid #333333'
                            }}
                        >
                            로그인
                        </Button>
                    </Form.Item>

                    {/* <Button
                        type="text"
                        block
                        className="btn-round mb-3"
                        style={{
                            height: '2.3em',
                            borderRadius: '5px',
                            fontSize: 20,
                            marginBottom: 20,
                            border: '1px solid #333333'
                        }}
                        icon={<img src={google} height='35' style={{ float: 'left' }} />}
                    >
                        <span style={{ verticalAlign: 'text-top' }}>Google 로그인</span>
                    </Button>

                    <Button
                        type="text"
                        block
                        className="btn-round mb-3"
                        style={{
                            height: '2.3em',
                            borderRadius: '5px',
                            fontSize: 20,
                            marginBottom: 20,
                            backgroundColor: '#03C75A',
                            color: '#fff'
                        }}
                        icon={<img src={naver} height='35' style={{ float: 'left' }} />}
                    // onClick={()=>{}}
                    >
                        <span style={{ verticalAlign: 'text-top' }}>네이버 로그인</span>
                    </Button>

                    <Button
                        type="text"
                        block
                        className="btn-round mb-3"
                        style={{
                            height: '2.3em',
                            borderRadius: '5px',
                            fontSize: 20,
                            backgroundColor: '#FEE500'
                        }}
                        icon={<img src={kakao} height='30' style={{ float: 'left', marginTop: '3px', marginLeft: '-4px' }} />}
                    >
                        <span style={{ verticalAlign: 'text-top' }}>카카오 로그인</span>
                    </Button> */}
                    
                    <Divider />

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                            style={{
                                textAlign: 'center',
                                width: '33%',
                                fontSize: 16,
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                navigate(ROUTE_FIND_ACCOUNT);
                                // setFindState('id');
                            }}
                        >
                            아이디 찾기
                        </div>
                        <Divider type='vertical' style={{ borderColor: '#aaa', alignSelf: 'center' }} />
                        <div
                            style={{
                                textAlign: 'center',
                                width: '33%',
                                fontSize: 16,
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                navigate(ROUTE_FIND_ACCOUNT);
                                // setFindState('pw');
                            }}
                        >
                            비밀번호 찾기
                        </div>
                        <Divider type='vertical' style={{ borderColor: '#aaa', alignSelf: 'center' }} />
                        <div
                            style={{
                                textAlign: 'center',
                                width: '33%',
                                fontSize: 16,
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                navigate(ROUTE_JOIN);
                                // setJoinStep('one')
                            }}
                        >
                            회원가입
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;