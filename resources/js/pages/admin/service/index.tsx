import { Head,useForm,usePage,Link } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes/admin';
import {edit, create, index , destroy } from '@/routes/admin/service';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Service',
        href: index().url,
    },
];
type Services={
    id:number;
    name:string;
    description:string;
    price:number;
    is_active:string;
};

export default function  Service() {
    const page = usePage<{ services: Services[] }>();
    const [services, setServices] = useState<Services[]>(page.props.services);
    const { delete: submitDelete, processing } = useForm({});
    function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this user?')) return;

        submitDelete(destroy(id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setServices(prev =>
                    prev.filter(service => service.id !== id)
                );
            },
        });
    }
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Service" />

            Service
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Service</h1>
                    {/* {<Link
                        href={create().url}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Add Service
                    </Link>} */}
                </div>

                <table className="w-full border rounded-xl overflow-hidden">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Is Active</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {services.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No services found
                                </td>
                            </tr>
                        )}

                        {services.map(service => (
                            <tr key={service.id} className="border-t">
                                <td className="p-3">{service.id}</td>
                                <td className="p-3">{service.name}</td>
                                <td className="p-3">{service.description}</td>
                                <td className="p-3">{service.price}</td>
                                <td className="p-3">{service.is_active}</td>
                                <td className="p-3 flex gap-3">
                                    <Link
                                        href={edit(service.id).url}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    {<button
                                        disabled={processing}
                                        onClick={() => handleDelete(service.id)}
                                        className="text-red-600 hover:underline disabled:opacity-50"
                                    >
                                        Delete
                                    </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </AdminLayout>
    );
}
