import React from "react";
import type { Article } from "../types";
import { Card, CardContent, CardMedia, Typography, Box, CardActionArea } from "@mui/material";
import { formatDistance } from "date-fns";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card>
      {/* <Card sx={{ width: { sm: "100%", md: "45%", lg:"30%" }, mx: "auto", my: 2 }}> */}
      <CardContent sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
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
            width: { xs: 150, sm: 200, md: 400 },
            height: 140,
            mx: { sm: "auto" },
          }}
          image={article.imageUrl}
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
