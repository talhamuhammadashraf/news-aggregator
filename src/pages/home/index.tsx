import { AppBar, Toolbar, Typography } from "@mui/material";
import SelectSource from "../../components/SelectSource";
import SearchInput from "../../components/SearchInput";
import CategoryTabs from "../../components/Tabs";
import { useState } from "react";
import SearchArticles from "../search";

const Header = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          color="#fff"
          sx={{
            mx: "auto",
            fontSize: {
              xs: 24,
              md: 36,
              fontFamily: "serif",
              fontStretch: "condensed",
              fontStyle: "italic",
            },
          }}
        >
          New Aggregator
        </Typography>

        <SearchInput editable={false} onClick={() => setModalVisible(true)} />

        <SelectSource />
        <SearchArticles
          isVisible={isModalVisible}
          close={() => setModalVisible(false)}
        />
      </Toolbar>
    </AppBar>
  );
};

const Home = () => (
  <div>
    <Header />
    <CategoryTabs />
  </div>
);

export default Home;
