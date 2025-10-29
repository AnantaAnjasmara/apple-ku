import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants/products';

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      addProduct: (newProduct) => {
        const { products } = get();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        set({ products: [...products, { ...newProduct, id: newId }] });
      },
      updateProduct: (id, updatedProduct) => {
        set({
          products: get().products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          ),
        });
      },
      deleteProduct: (id) => {
        set({ products: get().products.filter((product) => product.id !== id) });
      },
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);