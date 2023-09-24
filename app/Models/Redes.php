<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Redes extends Model
{
    protected $fillable = [
        'Instagram',
        'Facebook',
        'Twitter',

        // Agrega más propiedades según las columnas que tengas
    ];
}
