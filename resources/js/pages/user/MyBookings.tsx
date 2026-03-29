import { Head, usePage, useForm ,Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard} from '@/routes';
import { services,cancel } from '@/routes/user';

import type { BreadcrumbItem } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Services', href: services().url },
];

type Service = {
  id: number;
  name: string;
  description: string;
  price: string; 
  is_active: string;
};

type Provider = {
  id: number;
  name: string;
  email: string;
};

type Booking = {
  id: number;
  user_id: number;
  provider_id: number;
  service_id: number;
  price: string;
  notes: string;
  scheduled_at: string;
  status: 'pending' | 'accepted' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  lat: number | null;
  lng: number | null;
  accepted_at: string | null;
  cancelled_at: string | null;
  cancel_reason: string | null;
  payment_status: string;
  service: Service;
  provider: Provider;
};

export default function MyBookings() {
    const { bookings } = usePage<{ bookings: Booking[] }>().props;
 

  

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Booking" />
        <div>
      <h1>My Bookings</h1>

      {bookings.map(b => (
        <div key={b.id}>
          <p>{b.service.name}</p>
          <p>{b.provider.name}</p>
          <span className={`px-2 py-1 blake rounded ${
                b.status === 'pending' ? 'bg-white-200' :
                b.status === 'accepted' ? 'bg-green-200' :
                'bg-red-200'
                }`}>
                {b.status}
            </span>

          {b.status === 'pending' && (
            <Link
                href={cancel(b.id).url}
                method="post"
                
                onClick={(e) => {
                    if (!confirm('Are you sure you want to cancel this booking?')) {
                    e.preventDefault();
                    }
                }}
                className="text-red-600 hover:underline"
                >
                Cancel
            </Link>
            
           
          )}
        </div>
      ))}
    </div>
        
      
    </AppLayout>
  );
}