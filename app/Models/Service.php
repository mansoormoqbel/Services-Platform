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

    /* 'name'); 
            $table->text('description'); 
            $table->decimal('price',8,2); 
            $table->enum('is_active', ['active','not_active']); */
}
