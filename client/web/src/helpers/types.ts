// message entity
export type Message = {
  id: number;
  content: string;
  createdAt: number;
  owner: string;
  conutOfLikes: number;
};

// selectable mode of type
export type SortMode = "createdAt" | "countOfLikes" | "";

// selectable theme
export type Theme = "dark" | "light";
