<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;

class ServiceUController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', 'active')
            ->select('id', 'name', 'price')
            ->get();

        //return $services;    
        return Inertia::render('user/services', [
            'services' => $services
        ]);
    }
}
