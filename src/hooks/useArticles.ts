import type { Article } from "../types/article";
import { useQuery } from "@tanstack/react-query";
import { fetchAllArticles } from "../api";
import { useSource } from "./useSource";

export function useArticles(keyword: string, isSearch: boolean = false) {
  const { source } = useSource();

  return useQuery<Article[], Error>({
    queryKey: ["articles", source, keyword],
    queryFn: () => fetchAllArticles(source, keyword, isSearch),
    staleTime: 1000 * 60 * 20, // 20 minutes
  });
}
