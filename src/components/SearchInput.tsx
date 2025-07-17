import type { FC } from "react";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type ReadOnlyProps = {
  editable: false;
  onClick: () => void;
  onSubmit?: never;
};

type EditableProps = {
  editable: true;
  onClick?: never;
  onSubmit?: (value: string) => void;
};

const SearchInput: FC<ReadOnlyProps | EditableProps> = ({
  onClick,
  onSubmit,
  editable,
}) => {
  if (!editable)
    return (
      <Box
        sx={{
          width: "25ch",
          mx: 2,
          display: "flex",
          border: "1px solid primary.main",
          borderRadius: 1,
          px: 2,
          py: "7px",
          backgroundColor: "#fff",
          boxShadow: 1,
          "&:hover": { boxShadow: 3, borderColor: "#4644ea" },
        }}
        {...{ onClick }}
      >
        <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>
        <span style={{ color: "#888", marginLeft: 8 }}>Search</span>
      </Box>
    );
  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        onSubmit?.(formData.get("search") as string);
      }}
    >
      <FormControl sx={{ width: "25ch", mx: 1 }}>
        <InputLabel htmlFor="search">Search</InputLabel>
        <Input
          autoFocus
          id="search"
          name="search"
          type="text"
          sx={{ color: "#fff" }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};
export default SearchInput;
