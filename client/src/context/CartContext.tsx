import React, { ReactNode } from 'react';
import { createContext, useState } from 'react';
import { getProduct } from '../data';
import { ProductType } from '../types';

const initialData = {
  items: [] as ProductType[],
  getProductQuantity: (id: string): any => {},
  addOneToCart: (product: ProductType) => {},
  removeOneFromCart: (id: string) => {},
  deleteFromCart: (id: string) => {},
  getTotalCost: (): any => {},
};

export const CartContext = createContext(initialData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  const getProductQuantity = (id: string): number | undefined => {
    const product = cartProducts.find(
      (product: ProductType) => product.id === id
    );
    if (product === undefined) {
      return 0;
    } else {
      return product.quantity;
    }
  };

  const addOneToCart = (product: ProductType) => {
    const quantity = getProductQuantity(product.id);

    if (quantity === 0) {
      setCartProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    } else {
      const updatedProducts = cartProducts.map((cartProduct: ProductType) => {
        if (cartProduct.id === product.id) {
          return { ...product, quantity: cartProduct?.quantity! + 1 };
        }
        return cartProduct;
      });

      setCartProducts(updatedProducts);
    }
  };

  const removeOneFromCart = (id: string) => {
    const quantity = getProductQuantity(id);
    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      const updatedProducts = cartProducts.map((cartProduct: ProductType) => {
        if (cartProduct.id === id) {
          return { ...cartProduct, quantity: cartProduct?.quantity! - 1 };
        }
        return cartProduct;
      });
      setCartProducts(updatedProducts);
    }
  };

  const deleteFromCart = (id: string) => {
    const filteredProducts = cartProducts.filter(
      (currentProduct) => currentProduct.id != id
    );
    setCartProducts(filteredProducts);
  };

  const getTotalCost = (): number => {
    let totalCost = 0;
    cartProducts.map((cartItem: ProductType) => {
      const productData = getProduct(cartItem.id);
      totalCost += productData?.price! * cartItem?.quantity!;
    });
    console.log(cartProducts);
    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
