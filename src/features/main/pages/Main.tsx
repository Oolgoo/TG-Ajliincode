import { Button } from 'antd';
import main from 'assets/img/dashboard/main6.jpg'
import { useNavigate } from 'react-router-dom';
import { ROUTE_RECEPTION } from 'routes/const';

const Main = () => {

    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '20%', marginLeft: '5%' }}>
                    <strong style={{ fontSize: '2em', lineHeight: '200%' }}>쉽고</strong>
                    <br />
                    <strong style={{ fontSize: '2em', lineHeight: '200%' }}>빠르게</strong>
                    <br />
                    <strong style={{ fontSize: '2em', lineHeight: '200%' }}>상담해보세요</strong>
                    <br />
                    <hr />
                    <Button
                        type="primary"
                        style={{
                            height: '3rem',
                            borderRadius: 10,
                            color: '#23180C',
                            alignSelf: 'center',
                            backgroundColor: '#FBE7A2',
                            fontWeight: 600,
                            marginTop: '2rem',
                            fontSize: 18
                        }}
                        onClick={() => navigate(ROUTE_RECEPTION)}
                    >
                        <span>상담하러가기</span>
                    </Button>
                </div>
                <div style={{ width: '70%' }}>
                    <img
                        src={main}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                            height: '93vh',
                            objectPosition: 'center',
                            marginBottom: '-1rem'
                        }}
                    />
                </div>
            </div>
            {/* <div style={{ textAlign: 'center' }}>
                <div
                    style={{
                        // backgroundImage: 'url(https://static.petdoc.co.kr/petdoc-official/fourpaws/fourpaws_image.png) no-repeat center',
                        height: '65vh',
                        width: '100%'
                    }}>
                        <img 
                            src={main} 
                            style={{
                                width: '100%', 
                                objectFit: 'cover', 
                                height:'100%', 
                                objectPosition:'center',
                            }}
                        />
                </div>
                <div style={{ width: '70%', display:'inline-block' }}>
                    <Button
                        type="primary"
                        style={{
                            height: '3rem',
                            borderRadius: 10,
                            color: '#23180C',
                            float: 'right',
                            alignSelf: 'center',
                            backgroundColor: '#FBE7A2',
                            fontWeight: 600,
                            marginBottom: '-5rem',
                            marginTop: '3rem',
                        }}
                        onClick={() => navigate(ROUTE_RECEPTION)}
                    >
                        <span>상담하러가기</span>
                    </Button>
                    <Divider orientation="left" style={{ borderColor: '#747474'}} >
                        <h1 style={{ textAlign: 'left', marginBottom: '5rem' }}>쉽고 빠르게<br />상담해보세요.</h1>
                    </Divider>
                </div>
            </div> */}
        </>
    );
};

export default Main;