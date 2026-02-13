<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\adminController;
use App\Http\Controllers\Provider\providerController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::prefix('admin')->group(function () {
    Route::get('/dashboard',[adminController::class, 'index'])->name('admin.dashboard');
});

Route::prefix('provider')->group(function () {
    Route::get('/dashboard',[providerController::class, 'index'])->name('provider.dashboard');
});
require __DIR__.'/settings.php';
