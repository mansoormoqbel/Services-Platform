import { Head, useForm, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes/admin';
import { index, update } from '@/routes/admin/service';
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

type PageProps = {
    service: {
        id: number;
        name: string;
        description: string;
        price: number;
        is_active: string;
    };
};

export default function EditService() {
    const { service } = usePage<PageProps>().props;

    // Prevent crash if service is missing
    if (!service) {
        return <div className="p-6">Loading...</div>;
    }

    const form = useForm({
        name: service.name ?? '',
        description: service.description ?? '',
        price: service.price ?? 0,
        is_active: service.is_active ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.put(update(service.id).url);
    }

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Service" />

            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Edit Service</h1>

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

                    <textarea
                        className="w-full border p-2 rounded"
                        placeholder="Description"
                        value={form.data.description}
                        onChange={(e) =>
                            form.setData('description', e.target.value)
                        }
                        rows={4}
                    />

                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        placeholder="Price"
                        value={form.data.price}
                        onChange={(e) =>
                            form.setData('price', Number(e.target.value))
                        }
                    />

                    <select
                        className="w-full border p-2 rounded"
                        value={form.data.is_active}
                        onChange={(e) =>
                            form.setData('is_active', e.target.value)
                        }
                    >
                         <option  className="bg-black-100 text-gray-900">Select Status</option>
                        <option value="not_active" className="bg-black-100 text-gray-900">Not Active</option>
                        <option value="active" className="bg-black-100 text-gray-900">Active</option>
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
