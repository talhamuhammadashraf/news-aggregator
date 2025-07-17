import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Source } from "../types/source";
interface SourceContextType {
  source: Source;
  setSource: Dispatch<SetStateAction<Source>>;
}

export const SourceContext = createContext<SourceContextType>({
  source: "nytimes",
  setSource: () => {}, 
});
