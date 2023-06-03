import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IMaskInput } from "react-imask";
import { NumericFormat } from "react-number-format";
import { BookingInformation } from "./_app";
import { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PriceDrawer from "@/components/PriceDrawer";
import { useRouter } from "next/router";
import CountdownTimer from "./CountdownTimer";
import Autocomplete from "@mui/material/Autocomplete";
import { MaterialSymbol } from "material-symbols";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const ValidationTextFieldPhone = styled(TextField)(({ isValid }) => ({
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

const ValidationTextFieldZip = styled(TextField)(({ inputValueZip, isValid }) => ({
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
    "& input": {
      color: "#f9f9f9", // Set the text color
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#B2BAC2",
      borderWidth: 3,
    },
    "& input:valid + fieldset": {
      borderColor: "#00b88b",
      borderColor: isValid === 4 ? "#00b88b" : "#F9F01F",
    },
  },
}));

const ValidationTextField = styled(TextField)(({ isValid }) => ({
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
      borderColor: isValid === true ? "#00b88b" : "#F9F01F",
      borderWidth: 3,
    },
  },
}));
const ValidationAutocomplete = styled(Autocomplete)(({ isValid }) => ({
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

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00 00 00 00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

function Contact(props) {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [currentAccordionIndex, setCurrentAccordionIndex] = useState(0);
  const [formArray, setFormArray] = useState([]);
  const router = useRouter();

  console.log("number", bookingDetails.ticketAmount);

  const handleNextTicket = () => {
    setCurrentAccordionIndex(currentAccordionIndex + 1);
    console.log(formArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      phoneNumber: event.target.phoneNumber.value,
      email: event.target.email.value,
      streetAdress: event.target.streetAdress.value,
      zipCode: event.target.zipCode.value,
    };

    setFormArray((prevFormArray) => [...prevFormArray, formData]);
    handleNextTicket();
    console.log("Form Data:", JSON.stringify(formData));
    console.log(formData); // Log the stringified form data
    console.log(formArray.length);
    // event.target.reset()
  };

  useEffect(() => {
    console.log(formArray);
  }, [formArray]);

  function updateBookingDetails() {
    setBookingDetails((prev) => ({
      ...prev,
      contactInformation: {
        ...formArray,
      },
    }));
    goToPayment();
    ``;
  }

  function goToPayment() {
    router.push("/payment");
  }

  const steps = ["Amount", "Type", "Setup", "Information", "Payment"];

  return (
    <>
      <h2 className="mb-10 mt-48 text-center ">Enter your information</h2>
      <CountdownTimer />

      <Stepper
        className="m-auto mb-10 max-w-screen-md "
        sx={{
          "& .MuiSvgIcon-root": {
            color: "#969696",
          },
          "& .MuiStepIcon-text": {
            fill: "#102038",
            fontFamily: "Gill Sans",
            fontSize: "1rem",
            fontWeight: "600",
          },
          "& .MuiStepLabel-label": {
            color: "#F9F9F9",
            fontWeight: "500",
          },
        }}
        activeStep={3}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mx-1 mt-10 max-w-full rounded-sm bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 px-8 pt-8 md:mx-auto md:max-w-2xl">
        {[...Array(bookingDetails.ticketAmount)].map((_, index) => (
          <ContactForm
            bookingDetails={bookingDetails}
            updateBookingDetails={updateBookingDetails}
            numOfTickets={index + 1}
            key={index}
            fromIndex={index}
            isExpanded={index === currentAccordionIndex}
            onNextTicket={handleNextTicket}
            handleSubmit={handleSubmit}
            onClickAccordion={() => setCurrentAccordionIndex(index)}
          />
        ))}
        {bookingDetails.ticketAmount === formArray.length ? (
          <div className="mt-10 flex justify-center">
            <Button
              onClick={updateBookingDetails}
              className="
             place-s 
             elf-center mb-10 h-10
             gap-5 rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
              // onClick={goToPayment}
            >
              <span className="pt-1">Go to payment</span>
            </Button>
          </div>
        ) : (
          <div className="mt-10 flex justify-center">
            <Button
              disabled={true}
              className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-gray bg-color-gray px-6 font-sans font-semibold text-color-black hover:bg-color-yellow hover:text-color-black "
            >
              <span className="pt-1">Go to payment</span>
            </Button>
          </div>
        )}
      </div>

      {/* <div className="mt-10 flex justify-center">
        <Button
          onClick={() => console.log(bookingDetails)}
          className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-gray bg-color-gray px-6 font-sans font-semibold text-color-black hover:bg-color-yellow hover:text-color-black "
        >
          <span className="pt-1">Log information</span>
        </Button>
      </div> */}

      <div className={`fixed bottom-0 left-0 right-0 `}>
        <PriceDrawer />
      </div>
    </>
  );
}

function ContactForm(props) {
  const [values, setValues] = React.useState({
    phoneNumber: "",
  });
  const [isFirstNameValid, setIsFirstNameValid] = useState(null);
  const [isLastNameValid, setIsLastNameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [dataSuggestion, setDataSuggestion] = useState([]);
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(null);

  useEffect(() => {
    if (address) {
      console.log(address);
      fetch(`https://api.dataforsyningen.dk/autocomplete?q=${address}&caretpos=18&fuzzy=`).then((res) =>
        res
          .json()
          .then((data) => {
            const suggestAddress = data.map((adr) => ({
              value: adr.forslagstekst.toLowerCase(),
              label: adr.forslagstekst,
            }));
            setDataSuggestion(suggestAddress);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          })
      );
    }
  }, [address]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleEmail = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setIsEmailValid(value.includes("@"));
    }
  };

  const handlePhone = (event) => {
    const { name, value } = event.target;
    if (name === "phoneNumber") {
      setIsPhoneValid(value.length === 11);
    }
    console.log(isPhoneValid);
  };

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

  const handleFirstName = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setIsFirstNameValid(validateInput(name, value));
    }
  };

  const handleLastName = (event) => {
    const { name, value } = event.target;
    if (name === "lastName") {
      setIsLastNameValid(validateInput(name, value));
    }
  };

  const handleAddress = async (event) => {
    const { value } = event.target;

    try {
      const response = await fetch(`https://api.dataforsyningen.dk/autocomplete?q=${address}&caretpos=18&fuzzy=`); // Replace API_URL with the actual URL of your API
      const data = await response.json();

      const match = data.find((apiSuggestion) => apiSuggestion.forslagstekst.toLowerCase() === value.toLowerCase());
      setIsAddressValid(!!match);
      console.log(isAddressValid);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setIsAddressValid(false);
    }
  };
  const inputValue = values.phoneNumber.length;

  return (
    <form
      className="mb-2"
      onSubmit={props.handleSubmit}
    >
      <Accordion
        className="bg-color-opacity-20"
        expanded={props.isExpanded}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="fill-color-white" />}
          aria-controls="panel1d-content"
          id="panel1d-header"
          onClick={props.onClickAccordion}
        >
          <Typography className="font-bold text-color-white">Ticket #{props.numOfTickets} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ValidationTextField
            className={` ${isFirstNameValid === false && "shake"}`}
            InputProps={{
              inputMode: "text",
              endAdornment: (
                <>
                  {isFirstNameValid === true && <span class="material-symbols-outlined check">check_circle</span>}
                  {isFirstNameValid === false && <span class="material-symbols-outlined wrong">error</span>}
                </>
              ),
            }}
            onBlur={handleFirstName}
            fullWidth
            type="text"
            label="First name"
            required
            variant="outlined"
            defaultValue=""
            id="validation-outlined-input"
            name="firstName"
            isValid={isFirstNameValid}
          />
          {isFirstNameValid === false && <small className="font-sans">Please enter a valid firstname</small>}
          <ValidationTextField
            InputProps={{
              inputMode: "text",
              endAdornment: (
                <>
                  {isLastNameValid === true && <span class="material-symbols-outlined check">check_circle</span>}
                  {isLastNameValid === false && <span class="material-symbols-outlined wrong">error</span>}
                </>
              ),
            }}
            onBlur={handleLastName}
            fullWidth
            className={`mt-4 ${isLastNameValid === false && "shake"}`}
            type="text"
            label="Last name"
            required
            variant="outlined"
            defaultValue=""
            id="validation-outlined-input"
            name="lastName"
            isValid={isLastNameValid}
          />
          {isLastNameValid === false && <small className="font-sans">Please enter a valid lastname</small>}
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
          <ValidationTextField
            InputProps={{
              inputMode: "email",
              endAdornment: (
                <>
                  {isEmailValid === true && <span class="material-symbols-outlined check">check_circle</span>}
                  {isEmailValid === false && <span class="material-symbols-outlined wrong">error</span>}
                </>
              ),
            }}
            type="email"
            // error={isEmailValid}
            onBlur={handleEmail}
            fullWidth
            className={`mt-4 ${isEmailValid === false && "shake"}`}
            label="Email"
            required
            variant="outlined"
            defaultValue=""
            id="validation-outlined-input"
            name="email"
            isValid={isEmailValid}
          />
          {isEmailValid === false && <small className="font-sans">Email must contain at least an @ sign</small>}

          <ValidationAutocomplete
            className={`mt-4 ${isAddressValid === false && "shake"}`}
            InputProps={{
              inputMode: "text",
            }}
            onBlur={handleAddress}
            freeSolo
            fullWidth
            getOptionLabel={(address) => address.label}
            id="addressSearch"
            inputValue={address}
            onInputChange={(event, value) => setAddress(value)}
            isValid={isAddressValid}
            options={dataSuggestion}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Address"
              />
            )}
            name="addressField"
          />
          {isAddressValid === false && <small className="font-sans">Please enter a valid address!</small>}
        </AccordionDetails>
        <div className="mt-10 flex justify-center">
          <Button
            type="submit"
            onClick={() => props.updateBookingDetails}
            className=" place-s 
            elf-center mb-10 h-10
            gap-5 rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
          >
            <span className="pt-1">Next ticket</span>
          </Button>
        </div>
        {/* <Button onClick={() => console.log(props.bookingDetails)} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-black px-6 font-sans font-semibold text-color-black hover:bg-color-black hover:text-color-yellow ">
          <span className="pt-1">log info</span>
        </Button> */}
      </Accordion>
    </form>
  );
}

export default Contact;
