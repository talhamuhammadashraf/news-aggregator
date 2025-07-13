import { AppBar, Toolbar, Typography } from "@mui/material";
import SelectSource from "../../components/SelectSource";
import SearchInput from "../../components/Search";
import CategoryTabs from "../../components/Tabs";
const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          backgroundColor: "#4644ea",
          py: 4,
        }}
      >
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

        <SearchInput />

        <SelectSource />
        
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
