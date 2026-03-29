<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;

class ProviderUController extends Controller
{
    public function index(Service $service)
{
    //return $service;
    $providers = $service->providers()
        ->select('users.id', 'name')
        ->get();
    //return $providers;
    return Inertia::render('user/providers', [
        'providers' => $providers,
        'service' => $service
    ]);
}
}
