import type { Article } from "../types/article";
import { useQuery } from "@tanstack/react-query";
import { fetchAllArticles } from "../api";
import { useSource } from "./useSource";

export function useArticles(category: string) {
  const { source } = useSource();

  return useQuery<Article[], Error>({
    queryKey: ["articles", source, category],
    queryFn: () => fetchAllArticles(source,category),
    staleTime: 1000 * 60 * 20, // 20 minutes
  });
}
