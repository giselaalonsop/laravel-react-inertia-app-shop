<?php

namespace App\Http\Controllers;

use App\Models\Redes;
use Illuminate\Http\Request;


class RedesController extends Controller
{


    public function store(Request $request)
    {
        try {
            $request->merge(['skip_validation' => true]);
            $redes = Redes::first();

            if ($redes) {
                // Si la redes existe, actualiza los datos
                $redes->update([
                    'Instagram' => $request->Instagram,
                    'Facebook' => $request->Facebook,
                    'Twitter' => $request->Twitter,

                ]);
            } else {
                //Si no hay redes registrada
                $redes = Redes::create([
                    'Instagram' => $request->Instagram,
                    'Facebook' => $request->Facebook,
                    'Twitter' => $request->Twitter,
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
}
