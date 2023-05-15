import React, { Fragment } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { validateEmail } from "src/lib/helpers";
import { EmailList } from "src/components/messages/types";

const StyledAutoComplete = styled(
  Autocomplete as React.ComponentType<
    AutocompleteProps<string, true, false, true>
  >
)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.common.lightGrey}`,
  },
}));

const Error = styled("small")(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.error.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 500,
}));

type CustomAutoCompleteProps = {
  emailList: EmailList[];
  error: string;
  companyEmail: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomAutoComplete = (props: CustomAutoCompleteProps) => {
  const { emailList, error, companyEmail, onKeyDown, onChange } = props;
  return (
    <Fragment>
      <StyledAutoComplete
        multiple
        freeSolo={validateEmail(companyEmail) ? true : undefined}
        id="tags-filled"
        filterSelectedOptions
        options={emailList.map((option) => option.email)}
        defaultValue={[emailList[0].email]}
        renderTags={(value: readonly string[], getTagProps) => {
          return value.map((option: string, index: number) => (
            <Chip
              variant="filled"
              label={option}
              {...getTagProps({ index })}
              style={{ fontSize: "1.2rem" }}
            />
          ));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Recipient(s)"
            style={{ width: "100%" }}
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Fragment>
  );
};

export default CustomAutoComplete;
