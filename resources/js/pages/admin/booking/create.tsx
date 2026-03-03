import { useState  } from 'react';
import { Head,Form,Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from  '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AdminLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes/admin';
import { store, user} from '@/routes/admin/user';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: dashboard().url,
    },
    {
        title: 'User',
        href:   user().url,
    },
];
type Users={
    id:number;
    name:string;
    description:string;
    price:number;
    is_active:string;
};

export default function  CreateUser() {

     const [role,setRole]=useState('');

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
                                           <Label htmlFor="name">Name</Label>
                                           <Input
                                               id="name"
                                               type="text"
                                               required
                                               autoFocus
                                               tabIndex={1}
                                               autoComplete="name"
                                               name="name"
                                               placeholder="Full name"
                                           />
                                           <InputError
                                               message={errors.name}
                                               className="mt-2"
                                           />
                                       </div>
                                       
           
                                       <div className="grid gap-2">
                                           <Label htmlFor="email">Email address</Label>
                                           <Input
                                               id="email"
                                               type="email"
                                               required
                                               tabIndex={2}
                                               autoComplete="email"
                                               name="email"
                                               placeholder="email@example.com"
                                           />
                                           <InputError message={errors.email} />
                                       </div>
                                        <div className="grid gap-2">
                                           <Label htmlFor="role">Role</Label>
           
                                           <Select name="role" value={role} onValueChange={setRole}>
                                               <SelectTrigger id="role" tabIndex={3} className="w-full">
                                                   <SelectValue placeholder="Select a role" />
                                               </SelectTrigger>
           
                                               <SelectContent position="popper" className="z-50">
                                                   <SelectItem value="customer">User</SelectItem>
                                                   <SelectItem value="provider">Provider</SelectItem>
                                                   <SelectItem value="admin">ِAdmin</SelectItem>
                                               </SelectContent>
                                           </Select>
                                           <Input id="role" type="hidden" name="role" value={role} />
           
                                           <InputError message={errors.role} />
                                       </div>
                                       
           
                                       <div className="grid gap-2">
                                           <Label htmlFor="password">Password</Label>
                                           <Input
                                               id="password"
                                               type="password"
                                               required
                                               tabIndex={4}
                                               autoComplete="new-password"
                                               name="password"
                                               placeholder="Password"
                                           />
                                           <InputError message={errors.password} />
                                       </div>
           
                                       <div className="grid gap-2">
                                           <Label htmlFor="password_confirmation">
                                               Confirm password
                                           </Label>
                                           <Input
                                               id="password_confirmation"
                                               type="password"
                                               required
                                               tabIndex={5}
                                               autoComplete="new-password"
                                               name="password_confirmation"
                                               placeholder="Confirm password"
                                           />
                                           <InputError
                                               message={errors.password_confirmation}
                                           />
                                       </div>
           
                                       <Button
                                           type="submit"
                                           className="mt-2 w-full"
                                           tabIndex={5}
                                           data-test="register-user-button"
                                       >
                                           {processing && <Spinner />}
                                           Create User
                                       </Button>
                                   </div>
                                   
                                   
                                    {<Link
                                        href={user().url}
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
