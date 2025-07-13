import React from "react";
import type { Article } from "../types/article";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { formatDistance } from "date-fns";

const ArticleCard: React.FC<Article> = (article) => {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs:"column-reverse",sm: "row", md:"column-reverse", lg:"row"},
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <CardActionArea onClick={() => window.open(article.url, "_blank")}>
          <Box>
            <Typography color="#000" variant="h6">
              {article.title}
            </Typography>

            <Typography color="#2F2F2F" variant="body1">
              {article.description}
            </Typography>
          </Box>
        </CardActionArea>

        <CardMedia
          component="img"
          sx={{
            width: { sm: 360, md:"100%",lg: 1440 },
            height: 400,
            mx: { sm: "auto" },
          }}
          src={article.imageUrl}
          alt={article.title}
        />
      </CardContent>

      <CardContent sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {article.author ? `${article.author} |` : ""}

          {article.publishedAt
            ? ` ${formatDistance(article.publishedAt, new Date(), {
                addSuffix: true,
              })}`
            : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
