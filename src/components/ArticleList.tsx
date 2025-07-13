import { type FC } from "react";
import { Box } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { useArticles } from "../hooks/useArticles";

const ArticleList: FC<{ category: string }> = ({ category }) => {
  const { data } = useArticles(category);
  console.log("data", data);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", sm: "column" },
        flexWrap: "wrap",
        p: 2,
      }}
    >
      {data?.map((article, i) => (
        <ArticleCard key={i} {...article} />
      ))}
    </Box>
  );
};

export default ArticleList;
