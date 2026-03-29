<?php

namespace App\Http\Controllers\User;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class DashboardUController extends Controller
{
    public function Dashboard() {
        $user = auth()->user();
        //return $user->user()->count();
        //return $user->user()->where('status','pending')->count();
        // return $user->user()->where('status','completed')->count();

    return Inertia::render('dashboard', [
        'stats'=>[

        
        'total' => $user->user()->count(),
        'pending' => $user->user()->where('status','pending')->count(),
        'completed' => $user->user()->where('status','completed')->count(),
        ]
        ]);


        return Inertia::render('dashboard');
    }
}
