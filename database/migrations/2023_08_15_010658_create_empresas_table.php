<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('rif')->unique();
            $table->string('correo1');
            $table->string('correo2');
            $table->string('telefono1');
            $table->string('telefono2');
            $table->string('pais');
            $table->string('estado');
            $table->string('direccion');
            // Agrega más columnas según tus necesidades
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
