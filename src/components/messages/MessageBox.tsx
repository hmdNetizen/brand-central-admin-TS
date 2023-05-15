import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styles, useTheme } from "@mui/material/styles";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomTextArea from "src/utils/CustomTextArea";
import { validateEmail } from "src/lib/helpers";
import CustomAutoComplete from "src/utils/CustomAutoComplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

const style = {
  bgcolor: "background.paper",
};

const useStyles = makeStyles((theme) => ({
  box: {
    width: 500,
    position: "absolute",
    bottom: 5,
    right: 5,
    boxShadow: 24,
    padding: "1rem",

    [theme.breakpoints.only("xs")]: {
      width: "100%",
      right: 0,
      bottom: 0,
    },
  },
  formContainer: {
    "&.MuiGrid-root": {
      padding: "2rem",
      background: "#fff",
    },
  },
  button: {
    "&.MuiButton-root": {
      fontSize: "1.5rem",
      fontWeight: 400,
      textTransform: "none",
      width: "100%",
      background: theme.palette.secondary.dark,

      "&:hover": {
        background: theme.palette.secondary.light,
      },
      "&:active": {
        background: theme.palette.secondary.dark,
      },
    },
  },
}));

const MessageBox = ({
  open,
  setOpen,
  mailData,
  setMailData,
  emailList,
  companyEmailError,
  setCompanyEmailError,
  handleClose,
  handleAddToEmailList,
  onSubmit,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const { loadingEmailAction } = useSelector((state) => state.utils);

  const { companyEmail, subject, message } = mailData;

  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleEmailChange = (event) => {
    setMailData((prev) => ({ ...prev, companyEmail: event.target.value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMailData({ ...mailData, [name]: value });

    switch (name) {
      case "companyEmail":
        if (!value.trim()) {
          setCompanyEmailError("Email is required");
        } else if (!validateEmail(value)) {
          setCompanyEmailError("Please enter a valid email");
        } else {
          setCompanyEmailError("");
        }
        break;
      case "subject":
        if (!value.trim()) {
          setSubjectError("Subject is required");
        } else {
          setSubjectError("");
        }
        break;
      case "message":
        if (!value.trim()) {
          setMessageError("Message is required");
        } else {
          setMessageError("");
        }
        break;
      default:
        setCompanyEmailError("");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-Send-message"
      aria-describedby="modal-send-message-to-customer"
    >
      <Box style={style} className={classes.box}>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: theme.palette.secondary.dark,
            color: "#fff",
          }}
        >
          <Grid item>
            <Typography variant="h4" style={{ marginBottom: 0 }}>
              Send Message
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          className={classes.formContainer}
        >
          <CustomAutoComplete
            emailList={emailList}
            onKeyDown={handleAddToEmailList}
            error={companyEmailError}
            companyEmail={companyEmail}
            onInputChange={handleEmailChange}
          />
          <Grid item container style={{ margin: "2rem 0" }}>
            <CustomFormInput
              type="text"
              name="subject"
              placeholder="Subject"
              label=""
              value={subject}
              onChange={handleChange}
              error={subjectError}
            />
          </Grid>
          <Grid item container style={{ marginBottom: "2rem" }}>
            <CustomTextArea
              label=""
              name="message"
              placeholder="Enter your message"
              value={decodeURIComponent(message)}
              onChange={handleChange}
              error={messageError}
            />
          </Grid>
          <Grid item container>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disableRipple
              onClick={onSubmit}
            >
              {loadingEmailAction ? (
                <CircularProgress
                  style={{ height: 25, width: 25, color: "#fff" }}
                />
              ) : (
                "Send Message"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default MessageBox;
