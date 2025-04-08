export interface Merchant {
  name: string;
  logo?: string;
  clientId: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  accentColor: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tax: number;
  currency: "TWD" | "USD";
  image: string;
}

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  merchant: Merchant;
  products: Product[];
}

export const merchant: Merchant = {
  name: "好好喝茶飲",
  logo: "https://static.vecteezy.com/system/resources/thumbnails/013/478/280/small/bubble-tea-boba-fresh-drink-juice-fruit-modern-illustration-logo-vector.jpg",
  address: "台北市信義區信義路五段7號",
  email: "service@drink.tw",
  phone: "02-2720-1234",
  website: "https://google.com",
  clientId: "payment-demo-aa6bcc",
  accentColor: "#FFAC05FF",
};

export const product: Product = {
  id: "prod_001",
  name: "經典原片青茶",
  description: "採用台灣高山茶葉，清香回甘，冷泡更好喝。一盒 15 包，每包 10g。",
  price: 0.1,
  tax: 0.05,
  currency: "TWD",
  image:
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1920&auto=format&fit=crop",
};
