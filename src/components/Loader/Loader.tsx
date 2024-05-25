import { Backdrop, CircularProgress } from "@mui/material";

export const Loader = ({ open }: { open: boolean }) => (
  <Backdrop open={open}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
