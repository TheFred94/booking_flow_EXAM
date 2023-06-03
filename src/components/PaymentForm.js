import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { IMaskInput } from "react-imask";
export const ValidationTextFieldCardNum = styled(TextField)(({ isValid }) => ({
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
      borderWidth: isValid === false ? 2 : isValid === true ? 3 : 2,
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
      borderWidth: 3,
    },
    "& input:valid + fieldset": {
      borderColor: "#00b88b",
      borderColor: isValid === true ? "#00b88b" : "#F9F01F",
    },
  },
}));

export const ValidationTextFieldCardHolderName = styled(TextField)(({ isValid }) => ({
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
      borderWidth: isValid === false ? 2 : isValid === true ? 3 : 2,
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
      borderWidth: 3,
    },
    "& input:valid + fieldset": {
      borderColor: "#00b88b",
      borderColor: isValid === true ? "#00b88b" : "#F9F01F",
    },
  },
}));
export const ValidationTextFieldMonthYear = styled(TextField)(({ inputValue }) => ({
  "& label.Mui-focused": {
    color: "#f9f9f9", //label focused
  },
  "& label": {
    color: "#f9f9f9", //label unfocused
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },

    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: inputValue === 5 ? "green" : "F9F01F",
      borderWidth: 2,
    },
  },
}));
export const ValidationTextFieldCvc = styled(TextField)(({ inputValue }) => ({
  "& label.Mui-focused": {
    color: "#f9f9f9", //label focused
  },
  "& label": {
    color: "#f9f9f9", //label unfocused
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
    },
    "& input": {
      color: "#f9f9f9", // Set the text color
    },

    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderColor: inputValue === 3 ? "green" : "F9F01F",
      borderWidth: 2,
    },
  },
}));

export const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000-0000-0000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export const TextMaskmonthYearValue = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export const TextMaskCvc = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export function PaymentForm(props) {
  const [monthYearValue, setmonthYearValue] = useState({ monthYear: "" });
  const [cardNumberValue, setcardNumberValue] = useState({
    cardNumber: "",
  });
  const [cvcValue, setCvcValue] = useState({
    cvc: "",
  });
  const [isCardHolderNameValid, setIsCardHolderNameValid] = useState(null);

  const validateInput = (name, value) => {
    if (value.trim() === "") {
      // Input field is empty
      return false;
    }

    let hasNumbers = false;
    for (let i = 0; i < value.length; i++) {
      if (!isNaN(parseInt(value[i]))) {
        hasNumbers = true;
        break;
      }
    }
    return !hasNumbers;
  };

  const handleCardHolderName = (event) => {
    const { name, value } = event.target;
    if (name === "card-holder-name") {
      setIsCardHolderNameValid(validateInput(name, value));
    }
  };

  const handleChangeCvc = (event) => {
    setCvcValue({
      ...cvcValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setcardNumberValue({
      ...cardNumberValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangemonthYearValue = (event) => {
    setmonthYearValue({
      ...monthYearValue,
      [event.target.name]: event.target.value,
    });
  };

  const inputValue = cardNumberValue.cardNumber.length;
  const inputValuemonthYearValue = monthYearValue.monthYear.length;
  const inputValueCvc = cvcValue.cvc.length;

  return (
    <form
      className="mb-2"
      onSubmit={props.handleSubmit}
    >
      <ValidationTextFieldCardHolderName
        className={`mt-4 ${isCardHolderNameValid === false && "shake"}`}
        InputProps={{
          inputMode: "text",
          endAdornment: (
            <>
              {isCardHolderNameValid === true && <span class="material-symbols-outlined check">check_circle</span>}
              {isCardHolderNameValid === false && <span class="material-symbols-outlined wrong">error</span>}
            </>
          ),
        }}
        onBlur={handleCardHolderName}
        fullWidth
        type="text"
        label="Card holder name"
        required
        variant="outlined"
        defaultValue=""
        id="validation-outlined-input"
        name="card-holder-name"
        isValid={isCardHolderNameValid}
      />
      {isCardHolderNameValid === null ? <small>Enter the name of the card holder</small> : isCardHolderNameValid === true ? "" : isCardHolderNameValid === false ? <small>Please enter a valid name</small> : ""}
      <ValidationTextFieldCardNum
        inputProps={{ inputMode: "decimal" }}
        className="mt-4"
        onChange={handleChange}
        id="formatted-text-mask-input"
        InputProps={{ inputComponent: TextMaskCustom }}
        fullWidth
        label="Card number"
        required
        variant="outlined"
        value={cardNumberValue.cardNumber}
        inputValue={inputValue}
        name="cardNumber"
      />
      <small>
        E.g <span className="font-thin">1234-5678-9101-1123</span>
      </small>
      <div className="flex flex-row">
        <div className="flex flex-col gap-2">
          <ValidationTextFieldMonthYear
            inputProps={{ inputMode: "decimal" }}
            className="mt-4"
            onChange={handleChangemonthYearValue}
            id="formatted-text-mask-input"
            InputProps={{ inputComponent: TextMaskmonthYearValue }}
            label="Month/Year"
            required
            variant="outlined"
            value={monthYearValue.monthYear}
            inputValue={inputValuemonthYearValue}
            name="monthYear"
          />
          <small>
            E.g <span className="font-thin">12/12</span>
          </small>
        </div>
        <div className="ml-4 flex flex-col gap-2">
          <ValidationTextFieldCvc
            inputProps={{ inputMode: "decimal" }}
            className="mt-4"
            onChange={handleChangeCvc}
            id="formatted-text-mask-input"
            InputProps={{ inputComponent: TextMaskCvc }}
            label="CVC"
            required
            variant="outlined"
            value={cvcValue.cvc}
            inputValue={inputValueCvc}
            name="cvc"
          />
          <small>
            E.g <span className="font-thin">123</span>
          </small>
        </div>
      </div>

      {/* <ValidationTextField
              inputProps={{ inputMode: "text" }}
              fullWidth
              className="mt-4"
              label="cvc"
              required
              variant="outlined"
              defaultValue=""
              id="validation-outlined-input"
              name="cvc"
            /> */}

      {/* <Button onClick={() => console.log(props.bookingDetails)} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-black px-6 font-sans font-semibold text-color-black hover:bg-color-black hover:text-color-yellow ">
                <span className="pt-1">log info</span>
              </Button> */}
    </form>
  );
}
