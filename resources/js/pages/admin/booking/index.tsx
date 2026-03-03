import { Head,useForm,usePage,Link } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes/admin';
import {booking} from '@/routes/admin/booking'
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Bookings',
        href: booking().url,
    },
];
type bookings={
    id:number;
    user_id:string;
    provider_id:string;
    service_id:string;
    scheduled_at:string;
    status:string;
};

export default function  Users() {
    const page = usePage<{ bookings: bookings[] }>();
    const [bookings, setBookings] = useState<bookings[]>(page.props.bookings);
    const { delete: submitDelete, processing } = useForm({});
    function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this user?')) return;

        /* submitDelete(destroy(id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setUsers(prev =>
                    prev.filter(user => user.id !== id)
                );
            },
        }); */
    }
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Booking</h1>
                    {<Link
                        /* href={create().url} */
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Add User
                    </Link>} 
                </div>

                <table className="w-full border rounded-xl overflow-hidden">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">User Name </th>
                            <th className="p-3 text-left">Provider Name</th>
                            <th className="p-3 text-left">Service Name</th>
                            <th className="p-3 text-left">Scheduled  </th>
                            
                            <th className="p-3 text-left">status  </th>
                            
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        )}

                        {bookings.map(booking => (
                            <tr key={booking.id} className="border-t">
                                <td className="p-3">{booking.id}</td>
                                <td className="p-3">{booking.name}</td>
                                <td className="p-3">{booking.email}</td>
                                <td className="p-3">{booking.role}</td>
                                
                                <td className="p-3 flex gap-3">
                                    <Link
                                        /* href={edit(user.id).url} */
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    {<button
                                        disabled={processing}
                                        onClick={() => handleDelete(user.id)}
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
