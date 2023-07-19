import React from "react";
import Layout, { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { LoginHeader } from "./LoginHeader";
import { LoginFooter } from "./LoginFooter";

export const LoginLayout = () => {
    return (
        <Layout>
            <LoginHeader />
            <div style={{ backgroundColor: '#fff'}}>
                <Content 
                    style={{ 
                        paddingTop: '3rem', 
                        minHeight: '90vh', 
                        width: '1200px',
                        margin: '0 auto'
                    }}
                >
                    <Outlet />
                </Content>
            </div>
            <LoginFooter />
        </Layout>
    )
}