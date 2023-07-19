import React from "react";
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'

export const NotService = () => {

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
    </Layout>
  )
}