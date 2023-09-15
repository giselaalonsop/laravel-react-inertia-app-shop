<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use Illuminate\Http\Request;

class ConfiguracionController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function store(Request $request)
    {
        try {
            $request->merge(['skip_validation' => true]);
            $configuraciones = Configuracion::first();

            if (!$configuraciones) {
                $configuraciones = Configuracion::create([]);
            }

            if ($request->hasFile('logo')) {
                $file = $request->file('logo');
                $fotoPath = "images/logo/";
                $filename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('logo')->move($fotoPath, $filename);

                $configuraciones->logo = $fotoPath . $filename;
            }

            if ($request->hasFile('favicon')) {
                $file = $request->file('favicon');
                $faviconPath = "images/favicon/";
                $faviconFilename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('favicon')->move($faviconPath, $faviconFilename);

                $configuraciones->favicon = $faviconPath . $faviconFilename;
            }
            $colors = ['color1', 'color2', 'color3', 'color4'];
            foreach ($colors as $index => $colorField) {
                if ($request->has($colorField)) {
                    $configuraciones->$colorField = $request->$colorField;
                }
            }


            if ($request->hasFile('logo') || $request->hasFile('favicon') || $request->hasAny($colors)) {
                $configuraciones->save();
                return response()->json(['message' => 'Datos guardados exitosamente'], 201);
            }

            return response()->json(['error' => 'No se proporcionaron archivos de logo ni favicon'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
