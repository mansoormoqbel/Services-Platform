<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     * ['services' => $services]
     */
    public function index()
    {
       $services=Service::all();
       return Inertia::render('admin/service/index',['services' => $services] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('admin/service/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $data = $request->validate([
                'name' => 'required|string|max:255',

                'price' => 'required|numeric|min:0',

                'description' => 'nullable|string',

                'is_active' => 'required',
            ]);

            Service::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'description'=>$data['description'],
                'is_active' => $data['is_active'],
            ]);

            return redirect()->route('admin.service.index');
    }

    /**
     * Display the specified resource.
     */
    
    public function show(Service $service)
    {
       //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        $service=Service::where('id',$service->id)->get();
        return $service;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
