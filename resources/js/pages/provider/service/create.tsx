import { Head,useForm,Link } from '@inertiajs/react';
import ProviderLayout from '@/layouts/provider-layout';
import { dashboard ,store } from '@/routes/provider';
import { Home,Trash2,Bird  } from 'lucide-react';    
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Provider Dashboard',
        href: dashboard().url,
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
        post(store().url);
    }
    const handleDelete = () => {
        console.log("Item deleted");
        // add your delete logic here (API call, state update, etc.)
    };


    return (
        <ProviderLayout breadcrumbs={breadcrumbs}>
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
                   
                    {/* <Bird /> */}

                    <div className="flex gap-2">
                        <button
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                        {/* <button onClick={handleDelete}>
                            <Trash2 size={20} />
                        </button> */}
                        {<Link
                            href={dashboard().url}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </Link>}
                    </div>
                </form>
            </div>
        </ProviderLayout>
    );
}
