/* Adiciona tipos nos valores do formulário */

export interface Product {
  cod_sku: string,
  prod_name: string,
  price: string,
  category: '' | 'Leite' | 'Doce' | 'Iogurte'
}