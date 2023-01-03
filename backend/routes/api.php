<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SellerController;
use App\Http\Controllers\BudgetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('sellers/')->group(function () {
    Route::get('active', [SellerController::class, 'active']);
    Route::resource('/', SellerController::class);
});

Route::prefix('budgets/')->group(function () {
    Route::get('', [BudgetController::class, 'index']);
    Route::post('', [BudgetController::class, 'store']);
    Route::post('filter', [BudgetController::class, 'filter']);
    Route::put('{budget}', [BudgetController::class, 'update']);
    Route::delete('{budget}', [BudgetController::class, 'destroy']);
});