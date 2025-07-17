import { useContext } from "react";
import { SourceContext } from "../context/source";

export const useSource = () => useContext(SourceContext);