import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { Product } from './Interfaces'
import { api } from '../Services/api'

interface ProductsContextData {
  products: Product[],
  handleAddProduct: (newProduct: Product) => Promise<boolean | void>
  handleEditProduct: (product: Product, sku: number) => Promise<boolean | void>
  handleRemoveProduct: (sku: number) => void
}

interface ProductsProviderContext {
  children: ReactNode
}

/* Cria o context */
const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData)

/* Cria o provider */
export function ProductsProvider({ children }: ProductsProviderContext) {
  const [products, setProducts] = useState<Product[]>([])

  /** */
  useEffect(() => {
    api.get('/products')
    .then(response => { setProducts([response.data])})
  }, [])

  /* Realiza o post do novo produto para a fake api */
  async function handleAddProduct(product: Product) {
    if (products.map(e => e.sku).indexOf(product.sku) !== -1){
      return false
    } else {
      const response = await api.post('/products', product) 
      setProducts([...products, response.data.product])
    }    
  }

  async function handleEditProduct(product: Product, sku: number) {
    if (products.map(e => e.sku).indexOf(product.sku)  !== -1){      
      return false
    } else {
      const index = products.map(e => e.sku).indexOf(sku)
      const newArr = {
        product: {
          sku: product.sku,
          name: product.name,
          price: product.price,
          category: product.category,
          id: products[index].id
        } 
      }      

      const response = await api.patch(`/products/${products[index].id}`, newArr)

      products.splice(index, 1, response.data.product)      

      setProducts(products)
    } 
  }
  
  async function handleRemoveProduct(sku: number) {
    const index = products.map(e => e.sku).indexOf(sku)

    await api.delete(`/products/${products[index].id}`)

    const newArr = products.filter(product => product.sku !== sku)
    setProducts(newArr)
  }

  return (<ProductsContext.Provider value={{ products, handleAddProduct, handleRemoveProduct, handleEditProduct }}>
    {children}  
  </ProductsContext.Provider>
  );
};

export default ProductsContext;