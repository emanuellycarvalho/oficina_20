<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use Illuminate\Http\Request;
use App\Models\Budget;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Budget::with('seller')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBudgetRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBudgetRequest $request)
    {
        $works = Budget::create($request->validated());
        if($works){
            return response()->json([
                'status' => 200,
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function show(Budget $budget)
    {
        return $budget;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBudgetRequest  $request
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBudgetRequest $request, Budget $budget)
    {
        $works = $budget->update($request->validated());
        if($works){
            return response()->json([
                'status' => 200,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function destroy(Budget $budget)
    {
        $works = $budget->destroy();
        if($works){
            return response()->json([
                'status' => 200,
            ]);
        }
    }

    /**
     * Filter the budgets resources.
     *
     * @param  \App\Http\Requests\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function filter(Request $request)
    {
        $filters = $request->all();
        isset($filters['end']) ? $end = $filters['end'] : $end = null;
        isset($filters['begin']) ? $begin = $filters['begin'] : $begin = null;
        isset($filters['seller']) ? $seller = $filters['seller'] : $seller = null;
        isset($filters['client']) ? $client = $filters['client'] : $client = null;

        $budgets = Budget::
        when($client, function($query, $client){
            $query->where('client', 'like', '%' . $client . '%');
        })

        ->when($seller, function($query, $seller){
            $query->whereHas('seller', function($query) use ($seller){
                $query->where('name', 'like', '%' . $seller . '%');
            });
        })

        ->when($begin, function($query, $begin){
            $query->whereDate('created_at', '>=', $begin);
        })

        ->when($end, function($query, $end){
            $query->whereDate('created_at', '<=', $end);
        })

        ->with('seller')
        ->get();

        return $budgets;
    }
}
