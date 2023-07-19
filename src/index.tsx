import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.min.css';
import 'assets/css/font.css';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

// React Query Option
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true,
      suspense: true,
      //staleTime: 1000 * 20,   // default 0
      //cacheTime: 1000 * 60    // default 5분
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

root.render(
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App/>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
);