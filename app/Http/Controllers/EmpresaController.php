<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Configuracion;
use Inertia;

class EmpresaController extends Controller
{


    public function index()
    {
        $empresa = Empresa::first();
        $configuracion = Configuracion::first();

        return inertia('Welcome', ['configuracion' => $configuracion, 'empresa' => $empresa]);
    }
    public function store(Request $request)
    {
        try {
            $request->merge(['skip_validation' => true]);
            $empresa = Empresa::first();

            if ($empresa) {
                // Si la empresa existe, actualiza los datos
                $empresa->update([
                    'nombre' => $request->nombre,
                    'rif' => $request->rif,
                    'correo1' => $request->correo1,
                    'correo2' => $request->correo2,
                    'prefix1' => $request->prefix1,
                    'telefono1' => $request->telefono1,
                    'prefix2' => $request->prefix2,
                    'telefono2' => $request->telefono2,
                    'pais' => $request->pais,
                    'estado' => $request->estado,
                    'direccion' => $request->direccion,
                ]);
            } else {
                //Si no hay empresa registrada
                $empresa = Empresa::create([
                    'nombre' => $request->nombre,
                    'rif' => $request->rif,
                    'correo1' => $request->correo1,
                    'correo2' => $request->correo2,
                    'prefix1' => $request->prefix1,
                    'telefono1' => $request->telefono1,
                    'prefix2' => $request->prefix2,
                    'telefono2' => $request->telefono2,
                    'pais' => $request->pais,
                    'estado' => $request->estado,
                    'direccion' => $request->direccion,
                ]);
            }


            return response()->json(['message' => 'Empresa creada exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear la empresa'], 500);
        }
    }


    public function rules()
    {
        if ($this->input('skip_validation')) {
            return [];
        }
    }
    // public function index()
    // {
    //     $empresas = Empresa::all();
    //     return view('empresas.index', ['empresas' => $empresas]);
    // }
}
