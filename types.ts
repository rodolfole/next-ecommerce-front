import { IconType } from "react-icons";

export interface ICurrentUser {
  createdAt: Date;
  email: string | null;
  emailVerified: Date | null;
  favoriteIds: {
    id: string;
    productId: string;
    userId: string;
  }[];
  hashedPassword: string | null;
  id: string;
  image: string | null;
  name: string | null;
  updatedAt: Date;
}

export interface IBillboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface ICartProduct {
  colors: IColor[];
  id: string;
  images: IImage[];
  name: string;
  price: number;
  quantity: number;
  size?: ISize;
}

export interface ICategory {
  id: string;
  name: string;
  billboard: IBillboard;
}

export interface IColor {
  id: string;
  name: string;
  url: string;
}

export interface IImage {
  id: string;
  url: string;
}

export type Payment = {
  name: string;
  img: string;
  value: PaymentMethod;
  icon: IconType;
};

export type PaymentMethod = "mercadopago" | "stripe";

export interface IProduct {
  categoryId: string;
  category: ICategory;
  colors: IColor[];
  description: string | null;
  id: string;
  images: IImage[];
  isFeatured: boolean;
  name: string;
  price: string;
  sizes: ISize[];
  stock: number;
}

export interface ISize {
  id: string;
  name: string;
  value: string;
}

export interface IShippingAddress {
  address: string;
  address2?: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  zip: string;
}
