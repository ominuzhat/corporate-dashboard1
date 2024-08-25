export const TagTypes = {
  PROFILE: "Profile",
  RESTAURANT: "Restaurant",
  USERS: "Users",
  USER: "User",
  ROLE: "Role",
  LOGIN: "Login",
  CART: "Cart",
  PRODUCT: "Product",
  CATEGORY: "Category",
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
