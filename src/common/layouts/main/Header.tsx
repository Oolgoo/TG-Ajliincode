import React from "react";

import { MainNav } from "./Nav";
import styled from "styled-components";

const StyleMainHeader = styled.div`
    position: 'sticky';
    /* top: 0;
    z-index: 10; */
    padding-bottom: 10;
    background: 'white';
    padding-top: 10;
    /* display: "flex", */
    align-items: 'center';
    width: '100%';
    height:'60px';
`;

export const MainHeader = () => {
    return (
        <StyleMainHeader>
            <MainNav />
        </StyleMainHeader>
    )
}