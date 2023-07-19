import React from "react";
import { Footer } from "antd/es/layout/layout";

export const LoginFooter = () => {
    return (
        <Footer
            className={'backPrimary'}
            style={{ 
                color: 'white', 
                backgroundColor: '#1d2839', 
                height: '5rem', 
                display: 'flex', 
                width: '100%', 
                bottom: 0, 
                position:'relative' 
            }}
        >
        </Footer>
    )
}