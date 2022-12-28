<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Budget>
 */
class BudgetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'client' => fake()->name(),
            'description' => fake()->paragraph(),
            'value' => fake()->numberBetween($min = 50, $max = 3000),
            'seller_id' => fake()->numberBetween($min = 1, $max = 10),
        ];
    }
}
