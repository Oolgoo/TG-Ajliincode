import React from "react";
import styled from "styled-components";
import logo from '../../../assets/img/logo/logoA_black2.png';
import { useNavigate } from "react-router-dom";
import { ROUTE_MAIN } from "../../../routes/const";

const StyleLoginHeader = styled.div`
    position: 'sticky';
    padding-bottom: 10;
    background: 'white';
    padding-top: 10;
    align-items: 'center';
    width: '100%';
    height:'60px';
`;

export const LoginHeader = () => {
    const navigate = useNavigate();
    
    return (
        <StyleLoginHeader>
            <div style={{ 
                paddingTop: 10, 
                paddingBottom: 10, 
                backgroundColor: 'white',
                borderBottom: '1px solid #ddd'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                }}>

                    <div 
                        style={{ cursor: 'pointer', width: '11rem', marginLeft: '50px' }}
                        onClick={() => navigate(ROUTE_MAIN)}
                    >
                        <img src={logo} height ='30' alt="react-logo" style={{ marginTop: 3, float: 'right' }} />
                    </div>
                </div>
            </div>
        </StyleLoginHeader>
    )
}