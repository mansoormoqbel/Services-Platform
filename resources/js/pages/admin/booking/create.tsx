import { useState  } from 'react';
import { Head,Form,Link,usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from  '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AdminLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes/admin';
import { store, booking} from '@/routes/admin/booking';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Booking',
        href:   booking().url,
    },
];
type PageProps = {
    users: { id: number; name: string }[]
    providers: { id: number; name: string }[]
    services: { id: number; name: string }[]
}

export default function  CreateBooking() {

    const { users, providers, services } = usePage<PageProps>().props;
    const [user,setUser]=useState('');
    const [provider,setProvider]=useState('');
    const [service,setService]=useState('');
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Add User" />

            <Form
                           {...store.form()}
                           resetOnSuccess={['password', 'password_confirmation']}
                           disableWhileProcessing
                           className="flex flex-col gap-6"
                       >
                           {({ processing, errors }) => (
                                
                               <>

                                   <div className="grid gap-3">
                                      
                                        <div className="grid gap-2">
                                           <Label htmlFor="user">User</Label>
           
                                           <Select name="user_id" value={user} onValueChange={setUser}>
                                               <SelectTrigger id="user" tabIndex={3} className="w-full">
                                                   <SelectValue placeholder="Select a user" />
                                               </SelectTrigger>
           
                                               <SelectContent position="popper" className="z-50">
                                                    {users.map((user) => (
                                                        <SelectItem key={user.id} value={String(user.id)}>
                                                            {user.name}
                                                        </SelectItem>
                                                    ))}
                                               </SelectContent>
                                           </Select>
                                           <Input id="user" type="hidden" name="user_id" value={user} />
           
                                           <InputError message={errors.user_id} />
                                       </div>
                                       <div className="grid gap-2">
                                           <Label htmlFor="provider">Provider</Label>
           
                                           <Select name="provider_id" value={provider} onValueChange={setProvider}>
                                               <SelectTrigger id="provider" tabIndex={3} className="w-full">
                                                   <SelectValue placeholder="Select a provider" />
                                               </SelectTrigger>
           
                                               <SelectContent position="popper" className="z-50">
                                                    {providers.map((provider) => (
                                                        <SelectItem key={provider.id} value={String(provider.id)}>
                                                            {provider.name}
                                                        </SelectItem>
                                                    ))}
                                               </SelectContent>
                                           </Select>
                                           <Input id="provider" type="hidden" name="provider_id" value={provider} />
           
                                           <InputError message={errors.provider_id} />
                                       </div>
                                       <div className="grid gap-2">
                                           <Label htmlFor="service">Service</Label>
           
                                           <Select name="service_id" value={service} onValueChange={setService}>
                                               <SelectTrigger id="service" tabIndex={3} className="w-full">
                                                   <SelectValue placeholder="Select a service" />
                                               </SelectTrigger>
           
                                               <SelectContent position="popper" className="z-50">
                                                    {services.map((service) => (
                                                        <SelectItem key={service.id} value={String(service.id)}>
                                                            {service.name}
                                                        </SelectItem>
                                                    ))}
                                               </SelectContent>
                                           </Select>
                                           <Input id="service" type="hidden" name="service_id" value={service} />
           
                                           <InputError message={errors.service_id} />
                                       </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="scheduled_at">Data Booking</Label>
                                            <Input
                                                id="scheduled_at"
                                                type="date"
                                                required
                                                tabIndex={2}
                                                autoComplete="date"
                                                name="scheduled_at"
                                               min={new Date().toISOString().split("T")[0]}
                                                placeholder=""
                                            />
                                            <InputError message={errors.scheduled_at} />
                                        </div>
           
                                              
                                       <Button
                                           type="submit"
                                           className="mt-2 w-full"
                                           tabIndex={5}
                                           data-test="register-user-button"
                                       >
                                           {processing && <Spinner />}
                                           Create Booking
                                       </Button>
                                   </div>
                                   
                                   
                                   
                                    {<Link
                                        href={booking().url}
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </Link>}
           
                                  
                               </>
                           )}
                       </Form>
        </AdminLayout>
    );
}
