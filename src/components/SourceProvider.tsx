import { useState, type FC, type PropsWithChildren } from "react";
import { SourceContext } from "../context/source";
import type { Source } from "../types/source";

const SourceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [source, setSource] = useState<Source>("nytimes");

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      {children}
    </SourceContext.Provider>
  );
};

export default SourceProvider;