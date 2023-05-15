import React from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import CustomAutoComplete from "src/utils/CustomAutoComplete";
import { MessageFormProps } from "./types";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomTextArea from "src/utils/CustomTextArea";
import {
  StyledCircularProgress,
  SubmitButton,
} from "src/utilityStyles/pagesUtilityStyles";

const FormContainer = styled(Grid)<
  GridProps & { component: React.ElementType }
>({
  padding: "2rem",
  background: "#fff",
});

const MessageForm = (props: MessageFormProps) => {
  const {
    onSubmit,
    emailList,
    onAddEmailToList,
    companyEmail,
    companyEmailError,
    onChange,
    subject,
    message,
    messageError,
    subjectError,
    loadingMessageAction,
  } = props;
  return (
    <FormContainer
      item
      container
      direction="column"
      component="form"
      onSubmit={onSubmit}
    >
      <CustomAutoComplete
        emailList={emailList}
        onKeyDown={onAddEmailToList}
        error={companyEmailError}
        companyEmail={companyEmail}
        onChange={onChange}
      />
      <Grid item container style={{ margin: "2rem 0" }}>
        <CustomFormInput
          type="text"
          name="subject"
          placeholder="Subject"
          label=""
          value={subject}
          onChange={onChange}
          error={subjectError}
        />
      </Grid>
      <Grid item container style={{ marginBottom: "2rem" }}>
        <CustomTextArea
          label=""
          name="message"
          placeholder="Enter your message"
          value={decodeURIComponent(message)}
          onChange={onChange}
          error={messageError}
        />
      </Grid>
      <Grid item container>
        <SubmitButton
          type="submit"
          variant="contained"
          color="secondary"
          disableRipple
        >
          {loadingMessageAction ? (
            <StyledCircularProgress
              style={{ height: 25, width: 25, color: "#fff" }}
            />
          ) : (
            "Send Message"
          )}
        </SubmitButton>
      </Grid>
    </FormContainer>
  );
};

export default MessageForm;
