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
        'telefono1',
        'telefono2',
        'pais',
        'estado',
        'direccion',
        // Agrega más propiedades según las columnas que tengas
    ];
}
