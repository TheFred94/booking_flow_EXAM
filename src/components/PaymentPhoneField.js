import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { TextMaskCustom } from "@/pages/contact_information";

export const ValidationTextFieldPhone = styled(TextField)(({ isValid }) => ({
  "& label.Mui-focused": {
    color: "#f9f9f9", //label focused
  },
  "& label": {
    color: "#f9f9f9", //label unfocused
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: isValid === false ? "#eb8686" : isValid === true ? "#00b88b" : "#f9f01f",
      borderWidth: isValid === false ? 3 : isValid === true ? 3 : 2,
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
      borderWidth: 3,
    },
    "& input:valid + fieldset": {
      borderColor: isValid === true ? "#00b88b" : "#F9F01F",
      borderWidth: 3,
    },
  },
}));

export function PaymentPhoneField() {
  const [values, setValues] = React.useState({
    phoneNumber: "",
  });
  const [isPhoneValid, setIsPhoneValid] = useState(null);

  const handlePhone = (event) => {
    const { name, value } = event.target;
    if (name === "phoneNumber") {
      setIsPhoneValid(value.length === 11);
    }
    console.log(isPhoneValid);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const inputValue = values.phoneNumber.length;
  return (
    <>
      <ValidationTextFieldPhone
        className={`mt-4 ${isPhoneValid === false && "shake"}`}
        onChange={handleChange}
        id="formatted-text-mask-input"
        InputProps={{
          inputMode: "tel",
          inputComponent: TextMaskCustom,
          endAdornment: (
            <>
              {isPhoneValid === true && <span class="material-symbols-outlined check">check_circle</span>}
              {isPhoneValid === false && <span class="material-symbols-outlined wrong">error</span>}
            </>
          ),
        }}
        fullWidth
        label="Phone number"
        // error={!isPhoneValid}
        onBlur={handlePhone}
        required
        variant="outlined"
        value={values.phoneNumber}
        inputValue={inputValue}
        name="phoneNumber"
        isValid={isPhoneValid}
      />
      {isPhoneValid === false && (
        <small className="font-sans">
          Please enter a valid phone number e.g: <span className="font-sans font-thin">22 22 22 22</span>
        </small>
      )}
      {isPhoneValid === false && ""}
    </>
  );
}
