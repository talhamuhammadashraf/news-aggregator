import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SOURCE_LABELS } from "../constants";
import { useSource } from "../hooks/useSource";

const SelectSource: React.FC = () => {
  const { source, setSource } = useSource();
  return (
    <FormControl sx={{ width: "20ch" }} variant="standard">
      <InputLabel id="select-source">Source</InputLabel>
      <Select
        labelId="select-source"
        id="select-source"
        value={source}
        label="Source"
        sx={{ color: "white" }}
        //   inputProps={{ style: { color: "white" } }}
      >
        {Object.entries(SOURCE_LABELS).map(([key, value]) => (
          <MenuItem
            key={key}
            value={key}
            onClick={() => setSource(key as keyof typeof SOURCE_LABELS)}
            selected={source === key}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SelectSource;
