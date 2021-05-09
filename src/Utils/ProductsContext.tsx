import React, { createContext, useEffect, useState } from 'react'
import { Product, ProductsContextData, ProductsProviderContext } from './Interfaces'
import { api } from '../Services/api'

/**
 * Inicialização do Context
 */
const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData)

/**
 * 
 * @param {ProductsProviderContext} children Prop que contém o children do Context
 * @returns Retorn o componente ProductProvider
 */
export function ProductsProvider({ children }: ProductsProviderContext) {
  /**
   * Inicialização do estado dos produtos utilizando o useState
   */
  const [products, setProducts] = useState<Product[]>([])

  /**
   * Utilização do useEffect para receber os dados do fake server
   */
  useEffect(() => {
    api.get('/products')
    .then(response => { setProducts([response.data])})
  }, [])

  /**
   * Adiciona um novo produto no estado e no fake server
   * 
   * @param {Product} product Dados do prroduto que será adiciona
   * @returns {false | void} Retorna False se o sku do produto já existir em products, caso contrário retorna void
   */
  async function handleAddProduct(product: Product) {
    if (products.map(e => e.sku).indexOf(product.sku) !== -1){
      return false
    } else {
      const response = await api.post('/products', product) 
      setProducts([...products, response.data.product])
    }    
  }
  /**
   * Edita um produto que já existe e seta o estado de products
   * 
   * @param {Product} product Novos dados do produto que será editado
   * @param {number} sku SKU original do produto que será editado
   * @returns {false | void} Retorna False se o sku do produto já existir em products, caso contrário retorna void
   */
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
  /**
   * Remove um produto do servidor e seta o estado de products
   * 
   * @param {number} sku SKU do produto que será removido 
   */
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