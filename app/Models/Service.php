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

    public function service()
    {
        return $this->hasMany(Booking::class,'service_id');
    }
    public function providers() {
        return $this->belongsToMany(User::class, 'provider_service', 'service_id', 'provider_id');
    }
   
   
}
