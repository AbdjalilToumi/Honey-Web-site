'use client';
import { createContext } from 'react';

export interface ProductData {
  id: string;
  image: string;
  name_fr: string;
  name_en?: string;
  name_ar?: string;
  category: string;
  description_fr: string;
  description_en?: string;
  description_ar?: string;
  price: number;
  weight: string;
}

export const Productsdata = createContext<ProductData[]>([]);
