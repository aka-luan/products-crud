import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { Product } from './Interfaces'
import { api } from '../Services/api'

interface ProductsContextData {
  products: Product[],
  handleAddProduct: (newProduct: Product) => Promise<boolean | void>
  handleRemoveProduct: (cod_sku: number) => void
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
    .then(response => { setProducts([response.data])})

  }, [])


  /* Realiza o post do novo produto para a fake api */
  async function handleAddProduct(product: Product) {
    if (products.map(e => e.cod_sku).indexOf(product.cod_sku) !== -1){
      return false
    } else {
      const response = await api.post('/products', product) 
      setProducts([...products, response.data.product])
    }    

  }
  
  async function handleRemoveProduct(cod_sku: number) {
    const index = products.map(e => e.cod_sku).indexOf(cod_sku)    

    await api.delete(`/products/${products[index].id}`)

    const newArr = products.splice(index, 1)
    setProducts(newArr)
  }

  return (<ProductsContext.Provider value={{ products, handleAddProduct, handleRemoveProduct }}>
    {children}  
  </ProductsContext.Provider>
  );
};

export default ProductsContext;