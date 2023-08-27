<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;

class AdminController extends Controller
{
    public function index()
    {
        $empresa = Empresa::first(); // Recupera todos los registros de la tabla "empresas"
        return inertia('Dashboard', ['empresa' => $empresa]);
    }
}
