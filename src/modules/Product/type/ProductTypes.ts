import { TProductCategoryDataTypes } from "../../Configuration/ProductCategory/types/ProductCategoryTypes";

export type TPriceOptionData = {
  id?: number;
  discount: number;
  discountType?: any;
  price: number;
  support_for: string;
  title: string;
  pricePer: string;
  serviceLink?: string;
  keyPoints: string[];
  totalPrice?: number;
};

export type TCreatePriceOption = {
  discount: number;
  discountType?: any;
  products?: number[];
  price: number;
  support_for: string;
  title: string;
  pricePer: string;
  serviceLink?: string;
  keyPoints: string[];
};

export type TCreateProduct = {
  productCategory: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  live_link?: string;
  priceOptions: TCreatePriceOption[];
  is_documented?: boolean;
  images?: File;
  tags?: number[];
};

export type TProductData = {
  id?: number;
  productCategory: TProductCategoryDataTypes;
  title: string;
  featuredImage: string;
  subtitle: string;
  slug: string;
  live_link: string;
  priceOptions: TCreatePriceOption[];
  images?: File[];
  tags: any[];
};

export type TProductDetail = {
  id?: number;
  productCategory: any;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  live_link: string;
  priceOptions: any[];
  is_documented: boolean;
  images?: File[];
  tags?: any[];
};

export type TUpdateProduct = {
  productCategory?: number;
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  live_link?: string;
  priceOptions: any[];
  is_documented?: boolean;
  addImages?: File[];
  deleteImages?: number[];
  tags?: number[];
  addPriceOptions?: any[];
  deletePriceOptions?: number[];
};
