import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { Product } from './Interfaces'
import { api } from '../Services/api'

interface ProductsContextData {
  products: Product[],
  addProduct: (newProduct: Product) => Promise<void>
}

interface ProductsProviderContext {
  children: ReactNode
}

/* Cria o context */
const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData)

/* Cria o provider */
export function ProductsProvider({ children }: ProductsProviderContext) {
  const [products, setProducts] = useState<Product[]>([])

  /* Realiza a renderização do componente e o get dos produtos na api */
  useEffect(() => {
    api.get('/products')
    .then(response => setProducts([response.data]))
  }, [])

  /* Realiza o post do novo produto para a fake api */
  async function addProduct(product: Product) {
    const response = await api.post('/products', product)    

    setProducts([...products, response.data])
  }

  return (<ProductsContext.Provider value={{ products, addProduct}}>
    {children}  
  </ProductsContext.Provider>
  );
};

export default ProductsContext;