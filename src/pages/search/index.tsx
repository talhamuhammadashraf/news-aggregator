import { useState, type FC } from "react";
import { Box, IconButton, Modal, Toolbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import SearchInput from "../../components/SearchInput";
import SelectSource from "../../components/SelectSource";
import ArticleList from "../../components/ArticleList";
import EmptyState from "../../components/EmptyState";

type Props = {
  isVisible: boolean;
  close: () => void;
};

const SearchArticles: FC<Props> = ({ close, isVisible }) => {
  const [keyWord, setKeyword] = useState<string>("");
  console.log("Search keyword:", keyWord);

  const handleChange = (value: string) => {
    setKeyword(value);
  };
  return (
    <Modal open={isVisible} onClose={close} style={{ padding: 20 }}>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            gap: 2,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <IconButton
            sx={{ position: "absolute", right: 10, top: 10 }}
            onClick={close}
          >
            <Close />
          </IconButton>

          <SearchInput editable onSubmit={handleChange} />

          <SelectSource />
        </Toolbar>

        {keyWord ? (
          <Box sx={{ p: 3 }}>{<ArticleList category={keyWord!} />}</Box>
        ) : (
          <EmptyState color="primary">Enter a keyword to find articles.</EmptyState>
        )}
      </Box>
    </Modal>
  );
};

export default SearchArticles;
