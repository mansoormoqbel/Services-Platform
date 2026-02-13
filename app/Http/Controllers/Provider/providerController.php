<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class providerController extends Controller
{
    public function index()  {
        return Inertia::render('provider/dashboard');
    }
}
