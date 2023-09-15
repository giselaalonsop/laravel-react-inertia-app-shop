<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Configuracion;

class AdminController extends Controller
{
    public function index()
    {
        $empresa = Empresa::first(); // Recupera todos los registros de la tabla "empresas"
        $configuraciones = Configuracion::first();
        return inertia('Dashboard', ['empresa' => $empresa, 'configuraciones' => $configuraciones]);
    }
}
