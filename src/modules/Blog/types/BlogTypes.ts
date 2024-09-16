import { TCategoryDataTypes } from "../../Configuration/Category/types/CategoryTypes";

export type TBlogImageDataTypes = {
  id: number;
  image: string;
}

export type TBlogDataTypes = {
  id: number;
  name: string;
  webService?: any;
  title?: string;
  subtitle?: string;
  slug: string;
  views?: number;
  isFeatured?: boolean;
  images?: TBlogImageDataTypes[];
  category?: TCategoryDataTypes;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  content?: string;
  keyPoints?: string[];
  relatedBlogs?: any[];
};


export type TCreateBlogTypes = {
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  content: string;
  isFeatured: boolean;
  images?: any[];
  keyPoints?: string[];
  category: number;
};

export type TUpdateBlogTypes = {
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  content?: string;
  keyPoints?: string[];
  addImages?: any[];
  isFeatured: boolean;
  deleteImages?: number[];
  category?: number;
  webService?: number;
};
