import React, { useEffect, useState } from "react";
import "material-symbols";
import { BookingInformation } from "./_app";
import { useContext } from "react";
import PriceDrawer from "@/components/PriceDrawer";
import { useRouter } from "next/router";
import { PaymentForm } from "../components/PaymentForm";
import { Button } from "@mui/material";
import config from "../../config";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CountdownTimer from "./CountdownTimer";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { PhonePayment } from "@/components/svgs";
import { CardPayment } from "@/components/svgs";

export default function payment(props) {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [currentAccordionIndex, setCurrentAccordionIndex] = useState(0);
  const [formArray, setFormArray] = useState([]);
  const router = useRouter();

  // styling for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const apiUrl = config[process.env.NODE_ENV].apiUrl;
  console.log("number", bookingDetails.ticketAmount);

  const handleNextTicket = () => {
    setCurrentAccordionIndex(currentAccordionIndex + 1);
    console.log(formArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  async function confirmTickets() {
    const payload = { id: bookingDetails.reservation_id };

    const response = await fetch(`${apiUrl}/fullfill-reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    json.status !== 500 ? sendToSupabase() : handleOpen();
  }

  function sendToSupabase() {
    console.log(`send to supabase activatet`);

    // const payload = {
    //   area: "Nilfheim",
    //   campSetUp: false,
    //   contactInformation: [
    //     {
    //       email: "hanse@man.dk",
    //       firstName: "t",
    //       lastName: "34",
    //       phoneNumber: "33 33 33 44",
    //       streetAdress: "d",
    //     },
    //     {
    //       email: "hanse@man.dk",
    //       firstName: "t",
    //       lastName: "34",
    //       phoneNumber: "33 33 33 44",
    //       streetAdress: "d",
    //     },
    //   ],
    //   foofestTents: {
    //     threePersonTent: 0,
    //     twoPersonTent: 1,
    //   },
    //   greenCamp: true,
    //   oneTentForEach: true,
    //   privateTents: { threePersonTentPrivat: 0, twoPersonTentPrivat: 0 },
    //   reservation_id: "sktwi1zcnli8k8lgo",
    //   spotAmount: 1,
    //   ticketAmount: 1,
    //   ticketType: "vip",
    //   totalPrice: 1847,
    // };

    // console.log(payload);

    fetch("/api/send-to-supabase", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(router.push(`/thank_you`));
  }

  const steps = ["Amount", "Type", "Setup", "Information", "Payment"];

  return (
    <>
      <CountdownTimer />
      <main>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Something went Wrong!
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{
                  mt: 2,
                }}
              >
                something went Wrong{" "}
              </Typography>
              <div className="mt-10 flex justify-center">
                <Button
                  className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
                  onClick={handleClose}
                >
                  <span className="pt-1">Close</span>
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
        <h2 className="mb-10 mt-48 text-center">Payment</h2>
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
          activeStep={4}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <PaymentType />
        <div className="mx-1 mt-8 max-w-full rounded-sm bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 px-8 pt-8 md:mx-auto md:max-w-2xl">
          <PaymentForm
            bookingDetails={bookingDetails}
            // updateBookingDetails={updateBookingDetails}
            onNextTicket={handleNextTicket}
            handleSubmit={handleSubmit}
          />
          <div className="  mt-10 flex justify-center">
            <Button
              className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
              onClick={confirmTickets}
            >
              <span className="pt-1">Next step</span> <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
        </div>

        {/* ------------- logger button  ---------------- */}
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
      </main>
    </>
  );
}

function PaymentType() {
  return (
    <>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          <h3>Payment type</h3>
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
        >
          <div className="h-32 w-96 bg-color-opacity-10">
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": { color: "#f9f9f9" },
              }}
              className="h-10"
              value="female"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                      color: "#F9F01F",
                      "&.Mui-checked": {
                        color: "#F9F01F",
                      },
                      "&.MuiTouchRipple-root": {
                        color: "#F9F01F",
                      },
                    },
                  }}
                />
              }
              label="Female"
            />
            <CardPayment />
          </div>
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}
