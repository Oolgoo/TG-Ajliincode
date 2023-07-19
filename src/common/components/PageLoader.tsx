// base
import React from 'react';
import ReactDOM from 'react-dom';

// packages
import styled from 'styled-components';
import { Spin } from 'antd';

const SpinContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9e9e9;
  z-index: 9999;
`;

export const PageLoader = () => {
  return ReactDOM.createPortal(
    <SpinContainer>
      <Spin />
    </SpinContainer>,
    document.body
  );
};
