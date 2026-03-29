//import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { services,providers } from '@/routes/user';
import { Head,usePage,Link } from '@inertiajs/react';
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

export default function Service() {
    const page = usePage<{ services: Service1[] }>();
    const [services, setServices] = useState<Service1[]>(page.props.services);
    //this code error      
    const goToProviders = (serviceId:number) => {
        providers(serviceId).url;
    //router.get(`/services/${serviceId}/providers`);
    };
      
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <p>User Test</p>
            <div>
                <h1>Services</h1>

                    {services.map(service => (
                        <div key={service.id} style={{border:'1px solid #ccc', margin:10, padding:10}}>
                        <h3>service name :{service.name}</h3>
                        <p>Price: {service.price}</p>

                        <Link
                            href={providers(service.id).url}
                            className="text-blue-600 hover:underline"
                        >
                            booking now 
                        </Link>
                        
                        </div>
                    ))}
            </div>
        </AppLayout>
    );
}
