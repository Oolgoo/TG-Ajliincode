import { lazy } from 'react';

export * from './step1';
export * from './step2';
export * from './step3';
export * from './step4';

export const UserPetPage = lazy(() => import('./UserPet'));