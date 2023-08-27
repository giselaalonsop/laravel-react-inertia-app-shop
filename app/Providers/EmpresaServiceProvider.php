<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;
use App\Models\Empresa;

class EmpresaServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function getFirstEmpresa()
    {
        return Empresa::first();
    }
}
