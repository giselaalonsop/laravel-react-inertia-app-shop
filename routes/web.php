<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ConfiguracionController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\RedesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductosController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [EmpresaController::class, 'index']);
// Route::get('/', [ConfiguracionController::class, 'index']);

Route::post('/redes', [RedesController::class, 'store']);


Route::get('/dashboard', [AdminController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('Galeria', [PostController::class, 'create'])->name('Galeria');
Route::get('PostsForm', [PostController::class, 'index'])->name('PostsForm');
Route::post('/posts', [PostController::class, 'store']);
Route::put('/posts.up', [PostController::class, 'update']);
Route::delete('/posts/{id}', [PostController::class, 'destroy']);
Route::post('/dashboard', [EmpresaController::class, 'store']);
Route::post('/configuracion', [ConfiguracionController::class, 'store']);
Route::get('Productos', [ProductosController::class, 'create'])->name('Productos');
Route::post('/productos/save', [ProductosController::class, 'store']);
Route::put('/productos/{id}', [ProductosController::class, 'update']);
Route::delete('/productos/{id}', [ProductosController::class, 'destroy']);
Route::get('/ProductDetail/{id}', [ProductosController::class, 'show'])->name('/ProductDetail');

require __DIR__ . '/auth.php';
