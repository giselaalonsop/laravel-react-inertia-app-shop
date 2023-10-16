<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Empresa;
use App\Models\Configuracion;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create()
    {
        $empresa = Empresa::first();
        $configuracion = Configuracion::first();
        $posts = Post::all();
        $links = $posts->groupBy('tipo');
        return Inertia::render('Galeria', ['links' => $links, 'empresa' => $empresa, 'configuracion' => $configuracion]);
    }
    public function index()
    {


        return Inertia::render('Posts');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        try {
            $platforms = $request->input('platforms');

            foreach ($platforms as $platform) {
                Post::create([
                    'tipo' => $platform['type'],
                    'link' => $platform['link'],
                ]);
            }

            return response()->json(['message' => 'Enlaces creados exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear los enlaces'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            $platforms = $request->input('platforms');

            foreach ($platforms as $platform) {
                // Actualizar enlaces por ID
                Post::where('id', $platform['id'])->update([
                    'tipo' => $platform['type'],
                    'link' => $platform['link'],
                ]);
            }

            return response()->json(['message' => 'Enlaces actualizados exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar los enlaces'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // Eliminar enlace por ID
            Post::where('id', $id)->delete();

            return response()->json(['message' => 'Enlace eliminado exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el enlace'], 500);
        }
    }
}
