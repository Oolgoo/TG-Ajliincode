import React from "react";
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
//import { MainFooter } from 'common'
//import { ROUTE_DASH_BOARD } from 'routes/const'

//import mainLogo2 from 'assets/img/mainLogo02.png';
//import { useHistory } from 'react-router-dom'

export const NotFound = () => {
  //const history = useHistory();

  return (
    <Layout>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        paddingBottom: 10,
        background: 'white',
        paddingTop: 10,
        alignItems: 'center',
        width: '100%',
        height: '60px'
      }}>
        <div style={{ boxShadow: '2px 2px 10px 5px #0000001a', marginTop: -10, paddingTop: 10, paddingBottom: 20, backgroundColor: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ cursor: 'pointer', width: '11rem' }}
              onClick={() => {
                //history.replace(ROUTE_DASH_BOARD);
              }}>
              {/* <img src={mainLogo2} alt="react-logo" style={{ height: 35, marginTop: 3, float: 'right' }} /> */}
            </div>
          </div>
        </div>
      </div>
      <Content style={{ backgroundColor: 'white', paddingTop: '2rem', minHeight: '85vh', paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginTop: '10rem' }}>
          <h2>죄송합니다. <br/>현재 찾을 수 없는 페이지를 요청하셨습니다.</h2>
          <br/><br/>
          <p>존재하지 않는 주소를 입력하셨거나,</p>
          <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
          <p>문의사항은 관리자에게 연락 바랍니다. </p>
          <br/>
          {/* <Button onClick={() => history.replace(ROUTE_DASH_BOARD)}>홈으로</Button> */}
        </div>
      </Content>
      {/* <MainFooter /> */}
    </Layout>
  )
}