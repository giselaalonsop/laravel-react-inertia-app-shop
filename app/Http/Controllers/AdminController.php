<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Redes;
use App\Models\Configuracion;

class AdminController extends Controller
{
    public function index()
    {
        $empresa = Empresa::first(); // Recupera todos los registros de la tabla "empresas"
        $configuraciones = Configuracion::first();
        $redes = Redes::First();
        return inertia('Dashboard', ['empresa' => $empresa, 'configuraciones' => $configuraciones, 'redes' => $redes]);
    }
}
