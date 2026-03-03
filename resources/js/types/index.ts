export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};
export type service ={
    id:number;
    name:string;
    description:string;
    price:number;
    is_active:string;
};
export type booking ={
    id:number;
    user_id:string;
    provider_id:string;
    service_id:string;
    scheduled_at:string;
    status:string;
};
