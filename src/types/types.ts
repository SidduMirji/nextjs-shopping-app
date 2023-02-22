export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
  cartPrice: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}
