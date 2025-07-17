import { type ComponentProps, type FC, type PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

type Props = Pick<ComponentProps<typeof Typography>,'color'>

const EmptyState: FC<PropsWithChildren<Props>> = ({ children, color }) => (
  <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
    <Typography variant="body2" {...{ color }}>
      {children}
    </Typography>
  </Box>
);

export default EmptyState;
