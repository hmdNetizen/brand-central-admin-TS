import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTheme, styled } from "@mui/material/styles";

import { SubmitButton } from "src/utilityStyles/pagesUtilityStyles";
import ShowDialog from "./ShowDialog";
import { useNavigate, useLocation } from "react-router-dom";
import { useActions } from "src/hooks/useActions";

const Button = styled(SubmitButton)(({ theme }) => ({
  background: theme.palette.error.main,

  "&:hover": {
    background: theme.palette.error.light,
  },
}));

const ErrorDialog = ({ error }: { error: string | null }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const { logout } = useActions();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    setOpen(false);

    logout();
    navigate("/login", { state: { from: location } });
  };

  // useEffect(() => {
  //   if (
  //     error === "You are not authorized to perform this action" &&
  //     pathname !== "/login"
  //   ) {
  //     setOpen(true);
  //   }
  // }, [error, pathname]);

  return (
    <ShowDialog width={600} openModal={open} handleClose={handleClick}>
      <Grid container direction="column">
        <Grid
          item
          container
          py={1}
          style={{ background: theme.palette.error.light }}
        >
          <Grid item px={2}>
            <Typography
              variant="body1"
              color="white"
              style={{ fontWeight: "600" }}
            >
              Session Expired
            </Typography>
          </Grid>
        </Grid>
        <Grid item py={2} px={2}>
          <Typography align="center" variant="body1">
            {error}
          </Typography>
        </Grid>
        <Divider />
        <Grid item container justifyContent="flex-end" pt={2} pb={1} px={2}>
          <Grid>
            <Button variant="contained" disableRipple onClick={handleClick}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ShowDialog>
  );
};

export default ErrorDialog;
