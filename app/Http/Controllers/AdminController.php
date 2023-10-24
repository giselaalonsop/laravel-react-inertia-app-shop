<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Redes;
use App\Models\Configuracion;
use App\Models\Post;
use App\Models\Productos;

class AdminController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        $links = $posts->groupBy('tipo');
        $empresa = Empresa::first();
        $productos = Productos::all();


        $configuraciones = Configuracion::first();
        $redes = Redes::First();
        return inertia('Dashboard', ['empresa' => $empresa, 'configuraciones' => $configuraciones, 'redes' => $redes, 'links' => $links, 'productos' => $productos]);
    }
}
