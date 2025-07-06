import type { Article, ArticleFilters } from '../types';

export async function fetchNewsApiArticles(filters: ArticleFilters): Promise<Article[]> {
  const apiKey = '';
  if (!apiKey) return [];
  const params = new URLSearchParams({
    apiKey,
    q: filters.keyword || '',
    from: filters.from || '',
    to: filters.to || '',
    category: filters.category || '',
    sources: filters.source || '',
    pageSize: '20',
    language: 'en',
  });
  const url = `https://newsapi.org/v2/everything?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  if (!data.articles) return [];
  return data.articles.map((a: any, i: number) => ({
    id: a.url || String(i),
    title: a.title,
    description: a.description,
    url: a.url,
    imageUrl: a.urlToImage,
    publishedAt: a.publishedAt,
    source: a.source?.name || 'NewsAPI',
    author: a.author,
    category: filters.category || '',
  }));
}

export async function fetchOpenNewsArticles(_filters: ArticleFilters): Promise<Article[]> {
  // TODO: Implement OpenNews integration
  // Use process.env.REACT_APP_OPENNEWS_KEY
  // Map response to Article[]
  return [];
}

export async function fetchNewsCredArticles(_filters: ArticleFilters): Promise<Article[]> {
  // TODO: Implement NewsCred integration
  // Use process.env.REACT_APP_NEWSCRED_KEY
  // Map response to Article[]
  return [];
}

export async function fetchAllArticles(filters: ArticleFilters): Promise<Article[]> {
  const [newsApi, openNews, newsCred] = await Promise.all([
    fetchNewsApiArticles(filters),
    fetchOpenNewsArticles(filters),
    fetchNewsCredArticles(filters),
  ]);
  // Merge and deduplicate by article URL
  const all = [...newsApi, ...openNews, ...newsCred];
  const unique = Array.from(new Map(all.map(a => [a.url, a])).values());
  return unique;
}
