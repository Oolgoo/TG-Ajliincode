import React, { Suspense } from 'react';
//import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { UserRoutes } from './routes';
//import { history } from './app/store'
import { PageLoader } from './common';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary'
import { CookiesProvider } from 'react-cookie';
import locale from "antd/lib/locale/ko_KR";
import moment from 'moment';
import "moment/locale/ko";
import { ErrorFallback } from './common/components/Exception';

moment.locale("ko");

const App = () => {
  const { reset } = useQueryErrorResetBoundary();
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F5C523',
          borderRadius: 1,
          fontFamily: 'NEXON Lv1 Gothic OTF',
          fontSize: 15,
        }
      }}
      locale={locale}
    >
      <Suspense fallback={<PageLoader />}>
        <ErrorBoundary 
          onReset={reset}
          FallbackComponent={ErrorFallback}
        >
          <CookiesProvider>
            <BrowserRouter>
              <UserRoutes/>
            </BrowserRouter>
          </CookiesProvider> 
        </ErrorBoundary>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;