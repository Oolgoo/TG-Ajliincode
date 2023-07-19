import React from 'react';
import { Typography } from 'antd';

interface MainContentHeaderProps {
    title?: string;
    content?: string;
}
export const MainContentHeader = (props: MainContentHeaderProps) => {
    const { title, content } = props;
    const { Title, Paragraph } = Typography;

    return (
        <div style={{ 
            minHeight: '4rem', 
            marginBottom: '2rem'
        }}>
            <Title level={3}>{title}</Title>
            <Paragraph>
                <blockquote>{content}</blockquote>
            </Paragraph>
        </div>
    )
}