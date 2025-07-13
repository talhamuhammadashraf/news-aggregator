import axios from "axios";
import type { Article } from "../types/article";
import type { Source } from "../types/source";

const APIKeys: Record<Source, string> = {
  newsapi: import.meta.env.VITE_NEWSAPI_KEY,
  theguardian: import.meta.env.VITE_THE_GUARDIAN_KEY,
  nytimes: import.meta.env.VITE_NEW_YORK_TIMES_KEY,
};

async function newsapiCategory(
  source: Source,
  category: string
): Promise<Article[]> {
  const data = await axios.get("https://newsapi.org/v2/top-headlines", {
    headers: { Authorization: APIKeys[source] },
    params: { category },
  });

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
      category,
    })
  );
}

async function theguardianCategory(
  source: Source,
  category: string
): Promise<Article[]> {
  const data = await axios.get("http://content.guardianapis.com/search", {
    params: {
      "api-key": APIKeys[source],
      q: category,
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

async function nytimesCategory(
  source: Source,
  category: string
): Promise<Article[]> {
  const data = await axios.get(
    `https://api.nytimes.com/svc/topstories/v2/${category}.json`,
    { params: { "api-key": APIKeys[source] } }
  );
  return data.data.results.map(
    (article: {
      abstract: string;
      byline: string;
      created_date: string;
      multimedia: { url: string }[];
      published_date: string;
      section: string;
      short_url: string;
      title: string;
      url: string;
    }) => ({
      title: article.title,
      description: article.abstract,
      url: article.url,
      imageUrl: article.multimedia.length > 0 ? article.multimedia[0].url : "",
      publishedAt: article.published_date,
      author: article.byline,
      category: article.section,
    })
  );
}

export async function fetchAllArticles(
  source: Source,
  category: string
): Promise<Article[]> {
  console.log(category, source);
  switch (source) {
    case "nytimes":
      return nytimesCategory(source, category);
    case "newsapi":
      return newsapiCategory(source, category);
    case "theguardian":
      return theguardianCategory(source, category);
    default: {
      throw new Error(`Unhandled source: ${source}`);
    }
  }
}
