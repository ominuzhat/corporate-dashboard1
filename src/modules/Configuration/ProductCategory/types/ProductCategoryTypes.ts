export type TProductCategoryDataTypes = {
  id: number;
  name: string;
  color: string;
  icon: string;
  subtitle?: string;
  image?: string;
};

export type TCreateProductCategoryTypes = {
  name: string;
  color: string;
  icon: string;
  subtitle: string;
  image: string;
};

export type TUpdateProductCategoryTypes = {
  name?: string;
  color?: string;
  icon?: string;
  subtitle?: string;
  image?: string;
};
