
export type TSectionImageDataTypes = {
  id: number;
  image: string;
}

export type TSectionDataTypes = {
  id: number;
  title: string;
  subtitle?: string;
  sectionName: string;
  icon?: string;
  image?: string;
  description?: string;
  keyPoints?: string[];
  webService?: any;
  items?: any[];
};


export type TCreateSectionTypes = {
  title: string;
  sectionName: string;
  subtitle: string;
  description: string;
  icon?: string;
  image?: string;
  keyPoints?: string[];
  webService: number;
};

export type TUpdateSectionTypes = {
  title?: string;
  sectionName?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  image?: string;
  keyPoints?: string[];
  webService: number;
};
