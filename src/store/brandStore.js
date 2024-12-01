import { create } from 'zustand';

export const useBrandStore = create((set) => ({
  brands: [],
  setBrands: (brands) => set({ brands }),
  addBrand: (brand) => set((state) => ({ brands: [...state.brands, brand] })),
  updateBrand: (id, updatedBrand) =>
    set((state) => ({
      brands: state.brands.map((brand) =>
        brand.id === id ? { ...brand, ...updatedBrand } : brand
      ),
    })),
  deleteBrand: (id) =>
    set((state) => ({
      brands: state.brands.filter((brand) => brand.id !== id),
    })),
}));