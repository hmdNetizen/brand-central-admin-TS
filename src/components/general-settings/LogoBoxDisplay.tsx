import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { SubmitButton } from "src/utilityStyles/pagesUtilityStyles";

const Container = styled(Grid)({
  width: 300,
  background: "#fff",
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  borderRadius: 5,
  maxHeight: 320,
  marginBottom: "2rem",
});

const HeaderWrapper = styled(Grid)(({ theme }) => ({
  background: theme.palette.common.lighterGrey,
  justifyContent: "center",
  padding: "1rem",
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  maxWidth: 200,
  maxHeight: 90,
});

// const useStyles = makeStyles((theme) => ({
//   loader: {
//     marginRight: "1rem",
//     "&.MuiCircularProgress-root": {
//       color: "#f2f2f2",
//     },
//   },
// }));

const Input = styled("input")({
  display: "none",
});

type LogoBoxDisplayProps = {
  title: string;
  onSubmit: (event: React.FormEvent<Element>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | string;
  preview: string | undefined;
  inputId: string;
  name: string;
};

const LogoBoxDisplay = (props: LogoBoxDisplayProps) => {
  const { title, onSubmit, onChange, selectedFile, preview, inputId, name } =
    props;

  return (
    <Container item>
      <HeaderWrapper item container>
        <Typography variant="h4">{title}</Typography>
      </HeaderWrapper>
      <Grid
        item
        container
        direction="column"
        component="form"
        onSubmit={onSubmit}
        justifyContent="center"
        p={2}
        pb={3}
      >
        <Grid item container justifyContent="center" mb={4} mt={4}>
          <Image
            src={typeof selectedFile === "string" ? selectedFile : preview}
            alt="Brand Logo"
          />
        </Grid>
        <Grid item container justifyContent="center" mb={3}>
          <label htmlFor={inputId}>
            <Input
              accept="image/*"
              id={inputId}
              type="file"
              onChange={onChange}
              name={name}
            />
            <Button variant="contained" component="span">
              Change
            </Button>
          </label>
        </Grid>
        <Grid item container justifyContent="center">
          <SubmitButton
            type="submit"
            variant="contained"
            disableRipple
            color="secondary"
            // disabled={loadingAction}
          >
            {/* {loadingAction && (
              <CircularProgress
                style={{ height: 25, width: 25 }}
                className={classes.loader}
              />
            )}{" "} */}
            Submit
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogoBoxDisplay;
