import { Head, useForm, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes/admin';
import { user,update } from '@/routes/admin/user';
//import { index, update } from '@/routes/admin/service';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: dashboard().url,
    },
    {
        title: 'user',
        href: user().url,
    },
];

type PageProps = {
    user1:{
    id:number;
    name:string;
    email:string;
    password:string;
    role:string;
    };
};

export default function EditService() {
    const { user1 } = usePage<PageProps>().props;

    // Prevent crash if service is missing
    if (!user1) {
        return <div className="p-6">Loading...</div>;
    }

    const form = useForm({
        name: user1.name ?? '',
        email: user1.email ?? '',
        password: user1.password ?? '',
        role: user1.role ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.put(update(user1.id).url);
    }

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit user" />

            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Edit User</h1>

                {/* Validation Errors */}
                {form.hasErrors && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        <ul>
                            {Object.values(form.errors).map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Name"
                        value={form.data.name}
                        onChange={(e) =>
                            form.setData('name', e.target.value)
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="email"
                        value={form.data.email}
                        onChange={(e) =>
                            form.setData('email', e.target.value)
                        }
                        
                    />

                    <input
                        type="Password"
                        className="w-full border p-2 rounded"
                        placeholder="Password"
                        value={form.data.password}
                        onChange={(e) =>
                            form.setData('password', e.target.value)
                        }
                    />

                    <select
                        className="w-full border p-2 rounded"
                        value={form.data.role}
                        onChange={(e) =>
                            form.setData('role', e.target.value)
                        }
                    >
                         <option  className="bg-black-100 text-gray-900">Select Status</option>
                          
                        <option value="customer" className="bg-black-100 text-gray-900">User</option>
                        <option value="provider" className="bg-black-100 text-gray-900">provider</option>
                        <option value="admin" className="bg-black-100 text-gray-900">admin</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {form.processing ? 'Saving...' : 'Save'}
                        </button>

                        <Link
                            href={user().url}
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
