<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingUController extends Controller
{
    public function create(Request $request)
    {
        //return $request;
        $provider=User::where('id',$request->provider)->first();
        $service=Service::where('id',$request->service)->first();
        
        
        return Inertia::render('user/BookingCreate', [
            'provider' => $provider,
            'service' => $service
        ]);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'provider_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'scheduled_at' => 'required|date|after:now',
            'notes'=>'required',
        ]);
        $user=Auth::user();
        //return $user->id;

        $ser=Service::where('id',$data['service_id'])->first();
        
        Booking::create([
            'user_id' => $user->id,
            'provider_id' => $data['provider_id'],
            'service_id'=>$data['service_id'],
            'scheduled_at' => $data['scheduled_at'],
            'status'=>'pending',
            'notes'=>$data['notes'],
            'price'=>$ser->price,
        ]);
        return redirect()->route('dashboard');
    }
    public function myBookings()
    {
        $bookings = Booking::with(['service', 'provider'])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();
        //return $bookings;

        return Inertia::render('user/MyBookings', [
            'bookings' => $bookings
        ]);
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
}
