import { WallentState } from "../hooks/useMoney";

export type ProductItemType = {
  id: number;
  img: string;
  count: number;
  price: number;
  name: string;
};

export const productsDefaultState: ProductItemType[] = [
  {
    id: 1,
    img: "1.png",
    count: 0,
    price: 250,
    name: "Кока-кола",
  },
  {
    id: 2,
    img: "2.png",
    count: 8,
    price: 100,
    name: "Пепси",
  },
  {
    id: 3,
    img: "3.png",
    count: 11,
    price: 130,
    name: "Фанта",
  },
  {
    id: 4,
    img: "4.png",
    count: 10,
    price: 60,
    name: "Квас",
  },
  {
    id: 5,
    img: "5.png",
    count: 23,
    price: 60,
    name: "Спрайт",
  },
  {
    id: 6,
    img: "6.png",
    count: 11,
    price: 170,
    name: "Лейс",
  },
  {
    id: 7,
    img: "7.png",
    count: 40,
    price: 300,
    name: "Принглс",
  },
  {
    id: 8,
    img: "8.png",
    count: 14,
    price: 200,
    name: "Роллтон",
  },
];

export const machineDefaultBalance: WallentState[] = [
  { nominal: 500, count: 1 },
  { nominal: 50, count: 1 },
  // { nominal: 100, count: 1 },
  // { nominal: 1, count: 1 },
  // { nominal: 5, count: 1 },
  // { nominal: 10, count: 1 },

];

export const userDefaultBalance: WallentState[] = [
  { nominal: 1000, count: 1 },
  { nominal: 500, count: 2 },
  { nominal: 100, count: 4 },
  { nominal: 50, count: 11 },
];

export type RemainsResultType = {
  balance: WallentState[];
  money: number;
  products: string[];
};

export const remainsDefaultState: RemainsResultType = {
  balance: [],
  money: 0,
  products: [],
}