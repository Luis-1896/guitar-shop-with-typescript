export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = Guitar & {
  quantity: number;
};

// with interface the last code is similar  ho heredate to this:
// export interface CartItem extends Guitar {
//     quantity: number;
//   }

// Utility type - Heredate only some ariables of Guitar with Pick
// export type CartItem = Pick<Guitar, "id" | "name" | "price"> & {
//   quantity: number;
// };
