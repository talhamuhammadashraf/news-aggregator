import axios from "axios";
import type { Article } from "../types/article";
import type { Source } from "../types/source";

const APIKeys: Record<Source, string> = {
  newsapi: import.meta.env.VITE_NEWSAPI_KEY,
  theguardian: import.meta.env.VITE_THE_GUARDIAN_KEY,
  nytimes: import.meta.env.VITE_NEW_YORK_TIMES_KEY,
};
type FetchArticlesFn = (
  source: Source,
  keyword: string,
  isSearch: boolean
) => Promise<Article[]>;

const newsapiCategory:FetchArticlesFn = async(
  source, keyword, isSearch
)=> {
  const data = await axios.get(
    `https://newsapi.org/v2/${isSearch ? "everything" : "top-headlines"}`,
    {
      headers: { Authorization: APIKeys[source] },
      params: { [isSearch ? "q" : "category"]: keyword },
    }
  );

  return data.data.articles?.map(
    (article: {
      source: {
        id: string;
        name: string;
      };
      author: string;
      title: string;
      description: string;
      url: string;
      urlToImage: string;
      publishedAt: string;
      content: string;
    }) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      author: article.author,
      category: keyword,
    })
  );
}

async function theguardianCategory(
  source: Source,
  keyword: string
): Promise<Article[]> {
  const data = await axios.get("http://content.guardianapis.com/search", {
    params: {
      "api-key": APIKeys[source],
      q: keyword,
      "show-fields": "headline,trailText,byline,thumbnail,lastModified",
    },
  });

  return data.data.response.results?.map(
    (article: {
      webUrl: string;
      sectionName: string;
      fields: {
        headline: string;
        trailText: string;
        byline: string;
        thumbnail: string;
        lastModified: string;
      };
    }) => ({
      title: article.fields.headline,
      description: article.fields.trailText,
      url: article.webUrl,
      imageUrl: article.fields.thumbnail,
      publishedAt: article.fields.lastModified,
      author: article.fields.byline,
      category: article.sectionName,
    })
  );
}

const nytimesCategory:FetchArticlesFn = async(
  source, keyword, isSearch
)=> {
  const data = await axios.get(
    isSearch
      ? "https://api.nytimes.com/svc/search/v2/articlesearch.json"
      : `https://api.nytimes.com/svc/topstories/v2/${keyword}.json`,
    { params: { "api-key": APIKeys[source], ...(isSearch && { q: keyword }) } }
  );
  const articles = isSearch
    ? data.data?.response?.docs
    : data.data?.results;
  return articles?.map(
    (article: {
      title?: string;
      headline?: { main?: string };
      abstract: string;
      byline: { original?: string } | string;
      created_date: string;
      multimedia: { url: string }[] | { default: { url: string } };
      published_date: string;
      pub_date: string;
      section: string;
      section_name:string;
      url: string;
      web_url: string;
    }) => ({
      title: article?.headline?.main || article?.title,
      description: article.abstract,
      url: article.url || article.web_url,
      imageUrl: Array.isArray(article?.multimedia)
        ? article?.multimedia?.[0]?.url
        : article?.multimedia?.default?.url,
        
      publishedAt: article.published_date || article.pub_date,
      author:
        typeof article.byline === "object" && article.byline !== null
          ? article.byline.original
          : article.byline,
      category: article.section || article.section_name,
    })
  );
}

export const fetchAllArticles: FetchArticlesFn = async (source, keyword, isSearch) => {
  console.log(keyword, source,isSearch);
  switch (source) {
    case "nytimes":
      return nytimesCategory(source, keyword, isSearch);
    case "newsapi":
      return newsapiCategory(source, keyword, isSearch);
    case "theguardian":
      return theguardianCategory(source, keyword);
    default: {
      throw new Error("Something went wrong while fetching articles.");
    }
  }
};
