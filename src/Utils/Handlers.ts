import { ChangeEvent, useState, useContext } from "react";
import { Product } from "./Interfaces";
import ProductsContext from "./ProductsContext";



export function FormHandler(initialNewProduct: Product) {
  const [newProduct, setNewProduct] = useState(initialNewProduct)
  const { addProduct } = useContext(ProductsContext)

  /* Altera a variável newProduct sempre que algum dos inputs do form for alterado */
  const changeInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;

    setNewProduct({
      ...newProduct,
      [name]: value
    }) 
  }
  /* Chama a função addProduct em ProductsContext */
  async function handleCreateNewProduct(product: Product) {
    await addProduct(product)
  }

  return {
    newProduct,
    setNewProduct,
    changeInputValue,
    handleCreateNewProduct
  }
}
