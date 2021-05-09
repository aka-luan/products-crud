import {ReactNode} from 'react'

/**
 * Interface de Produtos que será utilizada em toda aplicação 
 * 
 * @param {number} id Identificador que é criado ao postar um item pela lib mirageJS
 * @param {number} sku Chave principal que identifica o produtos únicos
 * @param {number} name Nome do produto
 * @param {number} price Preço do produto
 * @param {number} category Categoria do produto
 */
export interface Product {
  id: number;
  sku: number,
  name: string,
  price: string,
  category: '' | 'Leite' | 'Doce' | 'Iogurte'
}

/**
 * Interface das props do componente ProductForm
 * 
 * @param {(text: string) => void} handleOpenModal Função utilizada para abrir o modal do componente GenericModal
 */
export interface ProductFormsProps {
  handleOpenModal: (text: string) => void
}

/**
 * Interface das props do componente ProductTable
 * 
 * @param {(text: string) => void} handleOpenModal Função utilizada para abrir o modal do componente GenericModal 
 * @param {(text: string) => void} handleOpenProductModal Função utilizada para abrir o modal do componente ProductModal 
 */
export interface ProductTableProps {
  handleOpenModal: (text: string) => void
  handleOpenProductModal: (row: Product) => void
}

/**
 * Interface das props do componente GenericModal
 * 
 * @param {boolean} isOpen Booleano para verificar se o modal está aberto
 * @param {() => void} closeModal Função que fecha o modal
 * @param {string} text Booleano para verificar se o modal está aberto
 */
export interface GenericModalProps {
  isOpen: boolean,
  closeModal: () => void,
  text: string
}

/**
 * Interface das props do componente GenericModal
 * 
 * @param {boolean} isOpen Booleano para verificar se o modal está aberto
 * @param {() => void} closeModal Função que fecha o modal
 * @param {Product} row Objeto contendo um produto
 * @param {(text: string) => void} handleOpenModal Função utilizada para abrir o modal do componente GenericModal 
 */
export interface ProductModalProps {  
  isOpen: boolean,
  closeModal: () => void,
  row: Product,
  handleOpenModal: (text: string) => void
}

/**
 * Interface dos dados repassados pelo Context do react
 * 
 * @param {Product[]} products array de objetos do tipo Product
 * @param {(newProduct: Product) => Promise<boolean | void>} handleAddProduct função para setar o estado dos produtos e postar novos produtos no server do mirageJS 
 * @param {(product: Product, sku: number) => Promise<boolean | void>} handleEditProduct função para setar o estado dos produtos e dar patch em um produto no server do mirageJS 
 * @param {(sku: number) => void} handleRemoveProduct função para setar o estado dos produtos e remover um produto no server do mirageJS 
 */
export interface ProductsContextData {
  products: Product[],
  handleAddProduct: (newProduct: Product) => Promise<boolean | void>
  handleEditProduct: (product: Product, sku: number) => Promise<boolean | void>
  handleRemoveProduct: (sku: number) => void
}

/**
 * Interface do Provider do Context
 * 
 * @param {ReactNode} children tipagem básica para componentes React
 */
export interface ProductsProviderContext {
  children: ReactNode
}