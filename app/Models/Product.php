<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'long_description',
        'price',
        'image',
        'gallery',
        'features',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'gallery' => 'array',
        'features' => 'array',
        'is_active' => 'boolean',
    ];
}
