<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;


class servicePController extends Controller
{
   public function Create()  {
    return Inertia::render('provider/service/create');
   }
   public function store(Request $request)
    {
         $data = $request->validate([
                'name' => 'required|string|max:255',

                'price' => 'required|numeric|min:0',

                'description' => 'nullable|string',

                
            ]);

           $ser= Service::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'description'=>$data['description'],
                'is_active' => 'not_active',
            ]);
            $ser_id= $ser->id;
            $pro_id=Auth::user();
            $pro_id->services()->attach($ser_id);
            
            /* $pro_id->services()->syncWithoutDetaching([$ser_id]); */           

            return redirect()->route('provider.dashboard');
    }
    public function service()  {
        $services = Auth::user()->services;
        //return $services;
        
        return Inertia::render('provider/service/index',['services' => $services]);
        //return view('provider.services', compact('services'));

        
    }
    
}
