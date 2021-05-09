/* Adiciona tipos nos valores do formulário */

export interface Product {
  id: number;
  sku: number,
  name: string,
  price: string,
  category: '' | 'Leite' | 'Doce' | 'Iogurte'
}

export interface ProductFormsProps {
  handleOpenModal: (text: string) => void
}

export interface ProductTableProps {
  handleOpenModal: (text: string) => void
  handleOpenProductModal: (row: Product) => void
}

export interface GenericModalProps {
  isOpen: boolean,
  closeModal: () => void,
  text: string
}

export interface ProductModalProps {
  isOpen: boolean,
  closeModal: () => void,
  row: Product,
  handleOpenModal: (text: string) => void
}