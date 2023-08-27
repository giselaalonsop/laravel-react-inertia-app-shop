<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'rif',
        'correo1',
        'correo2',
        'prefix1',
        'telefono1',
        'prefix2',
        'telefono2',
        'pais',
        'estado',
        'direccion',
        'logo',
        // Agrega más propiedades según las columnas que tengas
    ];
}
