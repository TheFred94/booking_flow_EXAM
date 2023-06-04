import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IMaskInput } from "react-imask";
import { NumericFormat } from "react-number-format";
import { BookingInformation } from "./_app";
import { useContext } from "react";
import PriceDrawer from "@/components/PriceDrawer";
import { useRouter } from "next/router";
import CountdownTimer from "./CountdownTimer";
import Autocomplete from "@mui/material/Autocomplete";
import { MaterialSymbol } from "material-symbols";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ContactForm } from "../components/ContactForm";

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

export const ValidationTextField = styled(TextField)(({ isValid }) => ({
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
export const ValidationAutocomplete = styled(Autocomplete)(({ isValid }) => ({
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

export const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
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

  const handleSubmit = (event, address) => {
    event.preventDefault();
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      phoneNumber: event.target.phoneNumber.value,
      email: event.target.email.value,
      streetAdress: event.target.addressField.value,
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

export default Contact;
