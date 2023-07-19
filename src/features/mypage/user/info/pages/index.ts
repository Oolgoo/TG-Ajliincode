import { lazy } from 'react';

export * from './Check';
export * from './UserInfoUpdate';
export * from './PswdUpdateModal';

export const UserInfoPage = lazy(() => import('./UserInfo'));
