import React from "react";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  width: "100%",

  "& .MuiOutlinedInput-input": {
    padding: "1.4rem",
  },
});

const Error = styled("small")(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.error.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 600,
}));

type CustomDatePickerProps = {
  value: dayjs.Dayjs | null;
  onDateChange: (newValue: dayjs.Dayjs | null) => void;
  label: string;
  error: string;
  name: string;
};

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const { error, label, value, onDateChange, name, ...rest } = props;
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    //   <DatePicker
    //     label={label}
    //     value={value}
    //     onChange={onChange}
    //     renderInput={(params) => (
    //       <TextField {...params} className={classes.formControl} />
    //     )}
    //     {...rest}
    //   />
    //   {error && <small className={classes.error}>{error}</small>}
    // </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          label={label}
          value={value}
          onChange={onDateChange}
          {...rest}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
