import { type Source } from "../types/source";
import newsapiData from "../data/newsapi.json";
import nytimesData from "../data/nytimes.json";
import theguardianData from "../data/theguardian.json";

const sections: Record<Source, typeof newsapiData.sections> = {
  newsapi: newsapiData.sections,
  nytimes: nytimesData.sections,
  theguardian: theguardianData.sections,
};

export const getCategories = (source: Source) => sections[source];
