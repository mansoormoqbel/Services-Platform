import { Head,useForm,Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes/admin';
import { stores,index } from '@/routes/admin/service';
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

export default function  CreateService() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        is_active:'',
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(stores().url);
    }


    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Service" />

            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Add Services</h1>
                {Object.keys(errors).length > 0 && (
                    <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>
                        <ul>
                            {Object.values(errors).map((error,i)=>(
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}    
                <form onSubmit={submit} className="space-y-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    <textarea
                        className="w-full border p-2 rounded"
                        placeholder="Description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        rows={4}
                    />

                    

                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        placeholder="Price"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                    />
                    <select
                        className="w-full border p-2 rounded"
                        value={data.is_active}
                        onChange={e => setData('is_active', e.target.value)}
                    >
                        <option  className="bg-black-100 text-gray-900">Select Status</option>
                        <option value="not_active" className="bg-black-100 text-gray-900">Not Active</option>
                        <option value="active" className="bg-black-100 text-gray-900">Active</option>
                    </select>
                    

                    <div className="flex gap-2">
                        <button
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                        <Link
                            href={index().url}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
