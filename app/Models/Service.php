<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table='services';
    protected $fillable = [
        'name',
        'description',
        'price',
        'is_active',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class,'service_id');
    }
   
   
}
