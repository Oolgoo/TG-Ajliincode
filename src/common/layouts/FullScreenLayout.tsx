import React from 'react';
import { Layout } from "antd"
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

export const FullScreenLayout = () => {
    return (
        <Layout>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    )
}