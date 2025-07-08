import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getCategories } from "../utils/categories";
import ArticleList from "./ArticleList";
import { useSource } from "../hooks/useSource";

export default function CategoryTabs() {
  const { source } = useSource(),
    categories = getCategories(source),
    [selectedCategory, setSelectedCategory] = React.useState(
      categories[0].name
    );

  React.useEffect(() => {
    // Reset selected category when source changes
    setSelectedCategory(categories[0].name);
  }, [source, categories]);

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault(); // Prevent default anchor behavior
    setSelectedCategory(value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          variant="scrollable"
        >
          {categories.map(({ name }, index) => (
            <Tab label={name} value={name} key={index} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>
        <ArticleList category={selectedCategory} />
      </Box>
    </Box>
  );
}
