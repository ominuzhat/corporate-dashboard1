import { TCategoryDataTypes } from "../../Configuration/Category/types/CategoryTypes";


export type TOurServiceImage = {
  id?: number;
  image: string;
}

export type TOurServiceFAQ = {
  id?: number;
  question: string;
  answer: string;
}

export type TOurServiceDataTypes = {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  icon: string;  
  price?: number;
  content?: string;
  category?: TCategoryDataTypes;
  contentTitle?: string;
  keyPoints: string[];
  images: TOurServiceImage[];
  faqs: TOurServiceFAQ[];
  webService?: any;
};


export type TCreateOurServiceTypes = {
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  icon?: string;
  price?: number;
  category?: number;
  content?: string;
  contentTitle?: string;
  faqs?: TOurServiceFAQ[];
  keyPoints?: string[];
  images?: any;
  webService: number;
};

export type TUpdateOurServiceTypes = {
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  icon?: string;
  price?: number;
  category?: number;
  content?: string;
  contentTitle?: string;
  addFaqs?: TOurServiceFAQ[];
  deleteFaqs?: number[];
  keyPoints?: string[];
  addImages?: any;
  deleteImages?: number[];
  webService: number;
};
