import { type FC } from "react";
import { Box } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { useArticles } from "../hooks/useArticles";
import EmptyState from "./EmptyState";

const ArticleList: FC<{ category: string }> = ({ category }) => {
  const { data, isFetching, isError, error, isSuccess } = useArticles(category);

  if (isError) return <EmptyState color="error">{error.message}</EmptyState>;

  else if (isFetching) return <EmptyState color="primary">Loading...</EmptyState>;
  
  if (isSuccess) {
  
    if (data?.length === 0) return <EmptyState color="info">No articles found.</EmptyState>;
    else
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
            <ArticleCard
              key={i}
              {...article}
            />
          ))}
        </Box>
      );
  }
};

export default ArticleList;
