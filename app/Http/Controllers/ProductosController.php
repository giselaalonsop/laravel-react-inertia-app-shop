<?php

namespace App\Http\Controllers;

use App\Models\Productos;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Empresa;
use App\Models\Configuracion;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productos = Productos::all();
        $empresa = Empresa::first();
        $configuracion = Configuracion::first();
        return Inertia::render('Productos', ['productos' => $productos, 'empresa' => $empresa, 'configuracion' => $configuracion]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->merge(['skip_validation' => true]);

            $producto = new Productos();
            if ($request->has('nombre')) {
                $producto->nombre = $request->nombre;
            }
            if ($request->has('precio')) {
                $producto->precio = $request->precio;
            }
            if ($request->has('descripcion')) {
                $producto->descripcion = $request->descripcion;
            }

            if ($request->hasFile('imagen1')) {
                $file = $request->file('imagen1');
                $fotoPath = "images/imagen1/";
                $filename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('imagen1')->move($fotoPath, $filename);

                $producto->imagen1 = $fotoPath . $filename;
            }

            if ($request->hasFile('imagen2')) {
                $file = $request->file('imagen2');
                $fotoPath = "images/imagen2/";
                $filename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('imagen2')->move($fotoPath, $filename);

                $producto->imagen2 = $fotoPath . $filename;
            }
            if ($request->hasFile('imagen3')) {
                $file = $request->file('imagen3');
                $fotoPath = "images/imagen3/";
                $filename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('imagen3')->move($fotoPath, $filename);

                $producto->imagen3 = $fotoPath . $filename;
            }

            if ($request->has('multimedia')) {
                $producto->multimedia = $request->input('multimedia');
            }

            // Guarda el producto en la base de datos
            $producto->save();

            return response()->json(['message' => 'Producto registrado correctamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $producto = Productos::find($id);
        $empresa = Empresa::first();
        $configuracion = Configuracion::first();

        // Aquí realiza las acciones para mostrar los detalles del producto, por ejemplo, cargar la vista 'productDetail' con los datos del producto
        return Inertia::render('ProductDetail', ['producto' => $producto, 'empresa' => $empresa, 'configuracion' => $configuracion]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Productos $productos)
    {
        try {
            // Obtener el producto a actualizar
            $producto = $productos;

            // Verificar si se proporcionan nuevos valores y actualizarlos
            if ($request->has('nombre')) {
                $producto->nombre = $request->nombre;
            }
            if ($request->has('precio')) {
                $producto->precio = $request->precio;
            }
            if ($request->has('descripcion')) {
                $producto->descripcion = $request->descripcion;
            }

            if ($request->hasFile('imagen1')) {
                // Procesar y guardar la nueva imagen
                $file = $request->file('imagen1');
                $fotoPath = "images/imagen1/";
                $filename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('imagen1')->move($fotoPath, $filename);
                $producto->imagen1 = $fotoPath . $filename;
            }

            if ($request->hasFile('imagen2')) {
                // Procesar y guardar la nueva imagen
                $file = $request->file('imagen2');
                $fotoPath = "images/imagen2/";
                $filename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('imagen2')->move($fotoPath, $filename);
                $producto->imagen2 = $fotoPath . $filename;
            }

            if ($request->hasFile('imagen3')) {
                // Procesar y guardar la nueva imagen
                $file = $request->file('imagen3');
                $fotoPath = "images/imagen3/";
                $filename = time() . '-' . $file->getClientOriginalName();
                $uploadSuccess = $request->file('imagen3')->move($fotoPath, $filename);
                $producto->imagen3 = $fotoPath . $filename;
            }

            if ($request->has('multimedia')) {
                $producto->multimedia = $request->input('multimedia');
            }

            // Actualizar el producto en la base de datos
            $producto->update();

            return response()->json(['message' => 'Producto actualizado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // Eliminar enlace por ID
            Productos::where('id', $id)->delete();

            return response()->json(['message' => 'Enlace eliminado exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el enlace'], 500);
        }
    }
}
