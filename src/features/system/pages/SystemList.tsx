import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Tabs } from 'antd';
import { AuthorList } from '../author';
import { CodeList } from '../code';
import { LogList } from '../log';
const { TabPane } = Tabs;

const SystemList = () => {

    const match = useMatch('/system/:id');

    const [activeKey, setActiveKey] = useState<string>();

    useEffect(() => {
        changeTab(match?.params?.id ? match?.params.id : 'author');
    }, [])

    const changeTab = (key: string) => {
        setActiveKey(key);
    }

    return (
        <>
            <Tabs activeKey={activeKey} type='card' onChange={changeTab} style={{marginTop: '1rem'}}>
                <TabPane tab='권한관리' key="author">
                    <AuthorList />
                </TabPane>
                <TabPane tab='코드관리' key="code">
                    <CodeList />
                </TabPane>
                <TabPane tab='사용로그' key="log">
                    <LogList />
                </TabPane>
            </Tabs>
        </>
    )
}

export default SystemList;