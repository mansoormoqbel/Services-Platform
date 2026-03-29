//import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { services,createBooking } from '@/routes/user';
import { Head,usePage,Link,router  } from '@inertiajs/react';
import { useState } from 'react';

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'services',
        href: services().url,
    },
];
type Service1={
    id:number;
    name:string;
    description:string;
    price:number;
    is_active:string;
};
type Provider1={
    id:number;
    name:string;
}

export default function Service() {
    const page = usePage<{ service: Service1; providers: Provider1[] }>();

const [service] = useState<Service1>(page.props.service);
const [provider] = useState<Provider1[]>(page.props.providers);
    
    const book = (PID: number) => {
        router.post(createBooking(), {
            provider: PID,
            service: service.id,
        });
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="providers " />
            <p>User Test</p>
            <div>
                <h1>Providers for {service.name}</h1>

                {provider.map(p => (
                    <div key={p.id}>
                    <p>Provider Name :{p.name}</p>

                    {<button onClick={() => book(p.id)}>
                        احجز
                    </button>}
                    </div>
                ))}
                </div>
            
        </AppLayout>
    );
}
