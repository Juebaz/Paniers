export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  startDate: Date;
  dropPoints?: DropPoint[];
  img: string;
};
export type DropPoint = { id: number; lat: number; lon: number; name: string };
