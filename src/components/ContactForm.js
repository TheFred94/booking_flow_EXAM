import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ValidationTextField, ValidationTextFieldPhone, TextMaskCustom, ValidationAutocomplete } from "../pages/contact_information";

export function ContactForm(props) {
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
      //** !!match is used to convert the match variable into a boolean value. #1 ! = converts into boolean value and reverts truthiness #2 ! = negates boolean from previous step. If falsy double negation returns false if truthy = returns true
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
          {isFirstNameValid === false ? <small className="font-sans">Please enter a valid firstname</small> : <small className="font-sans text-color-opacity-0">Please enter a valid firstname</small>}
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
          {isLastNameValid === false ? <small className="font-sans">Please enter a valid lastname</small> : <small className="font-sans text-color-opacity-0">Please enter a valid firstname</small>}
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
          {isPhoneValid === false ? (
            <small className="font-sans">
              Please enter a valid phone number e.g: <span className="font-sans font-thin">22 22 22 22</span>
            </small>
          ) : (
            <small className="font-sans text-color-opacity-0">Please enter a valid firstname</small>
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
          {isEmailValid === false ? <small className="font-sans">Email must contain at least an @ sign</small> : <small className="font-sans text-color-opacity-0">Please enter a valid firstname</small>}

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
                name="addressField"
              />
            )}
          />
          {isAddressValid === false ? <small className="font-sans">Please enter a valid address!</small> : <small className="font-sans text-color-opacity-0">Please enter a valid firstname</small>}
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
