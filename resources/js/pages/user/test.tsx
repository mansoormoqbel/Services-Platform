import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard} from '@/routes';
import { services, store } from '@/routes/user';

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Services', href: services().url },
];

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  is_active: string;
};

type Provider = {
  id: number;
  name: string;
  email:string;

};

export default function BookingCreate() {
  const { service, provider } = usePage<{ service: Service; provider: Provider }>().props;

  const { data, setData, post, processing, errors } = useForm({
    provider_id: provider.id,
    service_id: service.id,
    scheduled_at: '',
    notes: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(store().url, {
      onSuccess: () => alert('Booking created successfully!'),
      onError: (err) => console.log('Validation errors:', err),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Booking" />

      <h1>Create Booking for {service.name}</h1>

      <form onSubmit={submit}>
        
        <div>
          {/* <label>Select Provider:</label>
          <select
            value={data.provider_id}
            onChange={(e) => setData('provider_id', Number(e.target.value))}
          >
            {provider.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.provider_id && <p style={{ color: 'red' }}>{errors.provider_id}</p>}
        */}</div> 
        <div>
  <label>Provider:</label>
  <p>{provider.name}</p>
</div>

        {/* Date & Time */}
        <div>
          <label>Choose Date & Time:</label>
          <input
            type="datetime-local"
            value={data.scheduled_at}
            onChange={(e) => setData('scheduled_at', e.target.value)}
          />
          {errors.scheduled_at && <p style={{ color: 'red' }}>{errors.scheduled_at}</p>}
        </div>

        {/* Notes */}
        <div>
          <label>Notes (optional):</label>
          <textarea
            placeholder="Notes"
            value={data.notes}
            onChange={(e) => setData('notes', e.target.value)}
          />
          {errors.notes && <p style={{ color: 'red' }}>{errors.notes}</p>}
        </div>

        {/* Submit */}
        <button type="submit" disabled={processing}>
          {processing ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </AppLayout>
  );
}