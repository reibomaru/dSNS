export type Message = {
  id: number;
  content: string;
  createdAt: number;
  owner: string;
  conutOfLikes: number;
};

export type SortMode = "createdAt" | "countOfLikes" | "";

export type Theme = "dark" | "light";
