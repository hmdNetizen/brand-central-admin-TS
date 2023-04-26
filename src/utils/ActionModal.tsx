import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  HeadingWrapper,
  StyledCircularProgress,
  StyledIconButton,
  CancelButton,
  DeleteButton,
} from "./styles/ActionModalStyles";

type ActionModalProps = {
  openAction: boolean;
  setOpenAction: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  actionType: string;
  handleAction: () => void;
  data: string;
};

const ActionModal = (props: ActionModalProps) => {
  const { openAction, setOpenAction, loading, actionType, handleAction, data } =
    props;
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <ShowDialog
      openModal={openAction}
      handleClose={() => setOpenAction(false)}
      width={matchesXS ? "95%" : 500}
      height="50vh"
    >
      <Grid container direction="column">
        <HeadingWrapper item container justifyContent="space-between">
          <Grid item alignSelf="center">
            <Typography variant="h4">Confirm</Typography>
          </Grid>
          <Grid item>
            <StyledIconButton onClick={() => setOpenAction(false)}>
              <CloseIcon />
            </StyledIconButton>
          </Grid>
        </HeadingWrapper>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          sx={{ p: 2, height: "30vh" }}
        >
          <Grid item sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              style={{ fontSize: "2rem" }}
              align="center"
            >
              {`Are you sure you want to ${actionType}?`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h2"
              align="center"
              style={{ fontSize: matchesXS ? "2rem" : undefined }}
            >
              {data}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="flex-end"
          justifyContent="center"
          columnSpacing={3}
        >
          <Grid item>
            <CancelButton
              variant="contained"
              disableRipple
              onClick={() => setOpenAction(false)}
            >
              Cancel
            </CancelButton>
          </Grid>
          <Grid item>
            <DeleteButton
              variant="contained"
              disableRipple
              onClick={handleAction}
              disabled={loading}
            >
              {loading && (
                <StyledCircularProgress style={{ height: 25, width: 25 }} />
              )}{" "}
              {`Yes, ${actionType}`}
            </DeleteButton>
          </Grid>
        </Grid>
      </Grid>
    </ShowDialog>
  );
};

export default ActionModal;
