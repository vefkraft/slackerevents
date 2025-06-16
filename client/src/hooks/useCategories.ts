import { useDirectus } from "./useDirectus";
import type { Category } from "../types";


export function useCategories() {
  return useDirectus<Category>("categories");
}
