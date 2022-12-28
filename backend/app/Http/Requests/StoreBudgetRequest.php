<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'client' => 'required',
            'description' => 'required',
            'value' => 'required|min:1',
            'seller_id' => 'required|exists:sellers'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'client.required' => 'É necessário informar o nome do cliente.',
            'description.required' => 'É necessário informar a descrição do orçamento.',
            'value.required' => 'É necessário informar o valor do orçamento.',
            'value.min:1' => 'O valor do orçamento precisa ser maior que zero.',
            'seller_id.required' => 'É necessário informar o vendedor responsável.',
            'seller_id.exists:sellers' => 'O vendedor informado precisa estar registrado no sistema.'
        ];
    }
}
