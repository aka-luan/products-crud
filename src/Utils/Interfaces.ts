/* Adiciona tipos nos valores do formulário */

export interface Product {
  id: number;
  cod_sku: number,
  prod_name: string,
  price: string,
  category: '' | 'Leite' | 'Doce' | 'Iogurte'
}

export interface ProductFormsProps {
  handleOpenModal: (text: string) => void
}

export interface NewTransactionModalProps {
  isOpen: boolean,
  closeModal: () => void,
  text: string;
}