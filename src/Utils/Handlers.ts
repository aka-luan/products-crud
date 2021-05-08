import { useContext } from "react";
import { Product } from "./Interfaces";
import ProductsContext from "./ProductsContext";



export function FormHandler() {
  const { addProduct } = useContext(ProductsContext)
  /* Chama a função addProduct em ProductsContext */
  async function handleCreateNewProduct(product: Product) {
    await addProduct(product)
  }

  return {
    handleCreateNewProduct
  }
}
