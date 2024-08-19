export const TagTypes = {
  PROFILE: "Profile",
  RESTAURANT: "Restaurant",
  USERS: "Users",
  LOGIN: "Login",
  CART: "Cart",
  PRODUCT: "Product",
  CATEGORY: "Category",
  ORDER: "Order",
  SERVICE: "Service",
  OFFICEINFO: "OfficeInfo",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
