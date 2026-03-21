<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Service;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings=Booking::With('user','provider','service')->get();
       /*  return $bookings; */
        return Inertia::render('admin/booking/index',['bookings' => $bookings] );
     
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users=User::where('role','customer')->select('id','name')->get();
        $providers=User::Where('role','provider')->select('id','name')->get();
        $services=Service::select('id','name')->get();
        return Inertia::render('admin/booking/create',['users' => $users,'providers' => $providers,'services' => $services] );
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //return $request;
            $data = $request->validate([
                'user_id' => 'required|exists:users,id',
                'provider_id' => 'required|exists:users,id',
                'service_id' => 'required|exists:services,id',
                'scheduled_at' => 'required|date|after:now',
                'notes'=>'required',
            ]);
            $ser=Service::where('id',$data['service_id'])->first();
            
                Booking::create([
                'user_id' => $data['user_id'],
                'provider_id' => $data['provider_id'],
                'service_id'=>$data['service_id'],
                'scheduled_at' => $data['scheduled_at'],
                'status'=>'pending',
                'notes'=>$data['notes'],
                'price'=>$ser->price,

            ]);
        return redirect()->route('admin.booking.booking');
    }

    /**
     * Display the specified resource.
     */
    public function accept($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->update([
            'status' => 'accepted',
            'accepted_at' => now()
        ]);

        return back();
    }
    public function cancel(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $booking->update([
            'status' => 'cancelled',
            'cancel_reason' => $request->reason,
            'cancelled_at' => now()
        ]);

        return back();
    }
     public function complete($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->update([
            'status' => 'completed'
        ]);

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
         $booking->load(['user', 'provider', 'service']);

        return Inertia::render('admin/booking/edit', [
            'booking' => $booking
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'scheduled_at' => 'required|date',
            'status' => 'required|in:pending,accepted,completed,cancelled'
        ]);

        $booking->update($data);
        

    return redirect()->route('admin.booking.booking')
        ->with('success', 'Booking updated successfully');
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('admin.booking.booking');
    }
}
