import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  return (
    <FormControl sx={{ width: "25ch" }} variant="standard">
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input
        id="search"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => {}}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
export default SearchInput;
