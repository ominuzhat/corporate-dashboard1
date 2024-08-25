import { TSectionDataTypes } from "../../Section/types/SectionTypes";

export type TSectionItemImageDataTypes = {
  id: number;
  image: string;
}

export type TSectionItemDataTypes = {
  id: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  description?: string;
  icon?: string;
  image?: string;
  genericPageSection?: TSectionDataTypes;
};


export type TCreateSectionItemTypes = {
  title: string;
  subtitle: string;
  keyPoints?: string[];
  description?: string;
  icon?: string;
  image?: string;
  genericPageSection: number;
};

export type TUpdateSectionItemTypes = {
  title?: string;
  subtitle?: string;
  keyPoints?: string[];
  description?: string;
  icon?: string;
  image?: string;
  genericPageSection?: number;
};
