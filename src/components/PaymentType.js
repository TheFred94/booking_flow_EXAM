import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { PhonePayment } from "@/components/svgs";
import { CardPayment } from "@/components/svgs";

export function PaymentType({ setSelectedPaymentType }) {
  const [value, setValue] = useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setSelectedPaymentType(event.target.value);
  };

  return (
    <>
      <FormControl className="flex ">
        <FormLabel id="demo-radio-buttons-group-label">
          <h3>Payment type</h3>
        </FormLabel>

        <RadioGroup
          className=" mb-10 flex w-auto flex-row justify-center gap-12"
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
          onChange={handleRadioChange}
        >
          <div
            className={`bg-color flex h-32 w-40 justify-between  bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 pl-5 pt-3
            ${value === "card" ? "bg-gradient-to-b from-color-teal to-color-purple" : ""}
             `}
          >
            <div>
              <CardPayment className="fill-color-yellow" />
              <h4 className="font-sans text-color-white">Credit card</h4>
            </div>
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": { color: "#f9f9f9" },
              }}
              className="h-10"
              value="card"
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
              label=""
            />
          </div>

          <div
            className={`bg-color flex h-32 w-40 justify-between  bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 pl-5 pt-3
            ${value === "phone" ? "bg-gradient-to-b from-color-teal to-color-purple" : ""}
             `}
          >
            <div>
              <PhonePayment className="fill-color-yellow" />
              <h4 className="font-sans text-color-white">Phone</h4>
            </div>
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": { color: "#f9f9f9" },
              }}
              className="h-10"
              value="phone"
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
              label=""
            />
          </div>
        </RadioGroup>
      </FormControl>
    </>
  );
}
