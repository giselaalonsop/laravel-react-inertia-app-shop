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
use App\Models\Empresa;
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

Route::post('/dashboard', [EmpresaController::class, 'store']);
Route::post('/configuracion', [ConfiguracionController::class, 'store']);



require __DIR__ . '/auth.php';
