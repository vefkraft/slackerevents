import { useDirectus } from "./useDirectus";

export type Category = {
  id: string;
  name: string;
};

export function useCategories() {
  return useDirectus<Category>("category");
}