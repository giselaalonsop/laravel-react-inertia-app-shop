<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'precio',
        'descripcion',
        'imagen1',
        'imagen2',
        'imagen3',
        'multimedia'
    ];
}
