/* Adiciona tipos nos valores do formulário */

export interface Product {
  cod_sku: number,
  prod_name: string,
  price: string,
  category: '' | 'Leite' | 'Doce' | 'Iogurte'
}