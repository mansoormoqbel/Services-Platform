<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table='bookings';
    protected $fillable = [
        'user_id',
        'provider_id',
        'service_id',
        'scheduled_at',
        'status',
        'price',
        'notes',
        'lat',
        'lng',
        'payment_status'
    ];


    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function provider()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class ,'service_id');
    }
}
