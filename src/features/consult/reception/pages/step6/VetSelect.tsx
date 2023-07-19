
import { useSetRecoilState } from 'recoil';
import { receptionStepAtom } from '../../recoils/receptionRecoil';
import {
    Avatar,
    Button,
    Card,
    Divider,
    List,
    Radio,
    Space,
    Tag,
    Typography,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const VetSelect = () => {
    const { Title } = Typography;
    const receptionStep = useSetRecoilState(receptionStepAtom);

    const handlePreviousClick = () => {
        receptionStep('Step5');
    };

    const handleNextClick = () => {
        receptionStep('Step7');
    };

    const data1 = [
        {
            title: `돌담병원 부용주 수의사`,
            avatar: `https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_5%2F1682295752057wlsBN_JPEG%2Fb4f76b9287f69eb38c228e3a946fbb75.jpg`,
            vetType: `치과`,
            vetType2: `영상진단`
        },
    ];

    const data2 = [
        {
            title: `돌담병원 부용주 수의사`,
            avatar: `https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_5%2F1682295752057wlsBN_JPEG%2Fb4f76b9287f69eb38c228e3a946fbb75.jpg`,
            vetType: `치과`,
            vetType2: `영상진단`
        },
        {
            title: `돌담병원 서우진 수의사`,
            avatar: `https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_62%2F1682295858504Hwp2T_JPEG%2F5cc986971a347ebebfaa85dc8a1a5f6b.jpg`,
            vetType: `내과`,
            vetType2: `임상병리`,
            vetType3: `마취통증`,
        },
        {
            title: `돌담병원 차은재 수의사`,
            avatar: `https://search.pstatic.net/common?type=f&size=206x232&quality=75&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230424_237%2F16822959396966gTqu_JPEG%2F820aac34df2aaf61edec5f84f66a206a.jpg`,
            vetType: `가정의학과`,
            vetType2: `건강관리`,
        },
    ];

    return (
        <>
            <Typography>
                <Title level={5} style={{ marginTop: 10 }}>
                    <blockquote>어떤 수의사분께 상담하시겠어요?</blockquote>
                </Title>
            </Typography>

            <Divider />

            <Radio.Group
                defaultValue={0}
                style={{ width: '100%' }}
            //onChange={(e) => setConsult(e.target.value)}
            //value={consult}
            >
                <Card title='해당 증상 추천 수의사' bodyStyle={{ padding: 0 }}>
                    {/* 증상/좋아요 등 사용자가 선택한 값에 1명 추천 페이징x */}
                    <List
                        itemLayout="vertical"
                        size="small"
                        dataSource={data1}
                        renderItem={(item) => (
                            <List.Item key={item.title}>
                                <List.Item.Meta
                                    style={{ marginTop: 5, marginBottom: 5 }}
                                    avatar={
                                        <>
                                            <Radio value={0} style={{ marginRight: 10 }} />
                                            <Avatar
                                                size={64}
                                                icon={<UserOutlined />}
                                                src={item.avatar}
                                            />
                                        </>
                                    }
                                    title={item.title}
                                    description={[
                                        <Space key="action" size={[0, 8]} wrap>
                                            <Tag bordered={false} style={{ borderRadius: '3px', color: '#8E5A00' }} color='#FDF5E6'>{item.vetType}</Tag>
                                            <Tag bordered={false} style={{ borderRadius: '3px', color: '#8E5A00' }} color='#FDE5BC'>{item?.vetType2}</Tag>
                                        </Space>
                                    ]}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
                <Card title='수의사 조회' style={{ marginTop: '2rem' }} bodyStyle={{ padding: 0 }}>
                    <List
                        itemLayout="vertical"
                        size="small"
                        dataSource={data2}
                        style={{ padding: 5, height: '15rem', overflowX: 'hidden', overflowY: 'scroll' }}
                        renderItem={(item, index) => (
                            <List.Item key={item.title}>
                                <List.Item.Meta
                                    style={{ marginTop: 5, marginBottom: 5 }}
                                    avatar={
                                        <>
                                            <Radio value={index + 1} style={{ marginRight: 10 }} />
                                            <Avatar
                                                size={64}
                                                icon={<UserOutlined />}
                                                src={item.avatar}
                                            />
                                        </>
                                    }
                                    title={item.title}
                                    description={[
                                        <Space key="action" size={[0, 8]} wrap>
                                            <Tag bordered={false} style={{ borderRadius: '3px', color: '#8E5A00' }} color='#FDF5E6'>{item.vetType}</Tag>
                                            <Tag bordered={false} style={{ borderRadius: '3px', color: '#8E5A00' }} color='#FDE5BC'>{item?.vetType2}</Tag>
                                            {item?.vetType3 ? (<><Tag bordered={false} style={{ borderRadius: '3px', color: '#8E5A00' }} color='#FDD592'>{item?.vetType3}</Tag></>) : (<></>)}
                                        </Space>
                                    ]}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Radio.Group>

            <Divider />

            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Space wrap>
                    <Button
                        size='large'
                        style={{
                            borderRadius: 5,
                            width: 150,
                        }}
                        onClick={handlePreviousClick}
                    >
                        <span>이전</span>
                    </Button>

                    <Button
                        size='large'
                        type="primary"
                        style={{
                            borderRadius: 5,
                            width: 300,
                            color: 'black',
                        }}
                        onClick={handleNextClick}
                    >
                        <span>다음</span>
                    </Button>
                </Space>
            </div>
        </>
    );
};

export default VetSelect;
