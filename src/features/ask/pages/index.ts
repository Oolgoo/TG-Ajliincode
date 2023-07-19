import { lazy } from 'react';

export * from './agree';
export * from './result';

export const AskListPage = lazy(() => import('./AskList'));
export const AskDetailPage = lazy(() => import('./AskDetail'));
export const AskCreatePage = lazy(() => import('./AskCreate'));