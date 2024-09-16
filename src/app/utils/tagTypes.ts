export const TagTypes = {
  PROFILE: "Profile",
  RESTAURANT: "Restaurant",
  USERS: "Users",
  USER: "User",
  ROLE: "Role",
  LOGIN: "Login",
  CART: "Cart",
  TAG: "Tag",
  PRODUCT: "Product",
  CATEGORY: "Category",
  PRODUCT_CATEGORY: "ProductCategory",
  ORDER: "Order",
  SERVICE: "Service",
  OFFICEINFO: "OfficeInfo",
  WEBSERVICE: "WebService",
  KMS: "Kms",
  BLOG: "Blog",
  OUR_SERVICE: "OurService",
  SECTION: "Section",
  SECTION_ITEM: "SectionItem",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
