import classes from "./cupid_cash.module.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../componets/app_context";
import * as Api from "../../hook/api";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";

function CupidCash() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [creditCard, setCreditCard] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [userBalance, setUserBalance] = useState(user.profile.balance);
  const [errorMessage, setErrorMessage] = useState(null);
  const [zip, setZip] = useState(0);

  // Client-side validation function
  const validateAmount = (value) => {
    // TODO: In release we need this to be set back to 0, leaving as -10 to demonstrate negative values are accepted
    if (isNaN(value) || value <= -100) {
      setErrorMessage("Please enter a valid positive number.");
      return false;
    }
    return true;
  };

  // Validation Section:
  // TODO: This should be server side validation for data integrity
  const validateCreditCardInfo = () => {
    // Remove spaces from the credit card number before validation
    const cleanedCreditCard = creditCard.replace(/\s/g, "");

    // Credit card number validation (16 digits)
    const creditCardRegex = /^\d{16}$/;
    if (!creditCardRegex.test(cleanedCreditCard)) {
      setErrorMessage("Please enter a valid 16-digit credit card number.");
      return false;
    }
    // Expiration date validation (MM/YY format)
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationDateRegex.test(expirationDate)) {
      setErrorMessage("Please enter a valid expiration date in MM/YY format.");
      return false;
    }

    // Check if the card has not expired
    const currentDate = new Date();
    const enteredExpirationDate = new Date(
      `20${expirationDate.split("/")[1]}`,
      expirationDate.split("/")[0] - 1,
      1
    );
    if (enteredExpirationDate < currentDate) {
      setErrorMessage(
        "Card has expired. Please enter a valid expiration date."
      );
      return false;
    }

    // CVV validation (3 digits)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
      setErrorMessage("Please enter a valid 3-digit CVV.");
      return false;
    }

    return true;
  };

  const handleAmountChange = (v) => {
    const newValue = parseInt(v, 10) || 0;
    setAmountToAdd(newValue);
  };

  function creditCardValidation(value) {
    // Remove non-numeric characters from input
    const cleanedValue = value.replace(/\D/g, "");

    // Limit the credit card number to a maximum of 16 characters
    const truncatedValue = cleanedValue.slice(0, 16);

    // Format credit card number with spaces every 4 digits
    const formattedValue = truncatedValue.replace(/(\d{4})/g, "$1 ").trim();
    return formattedValue;
  }

  const handleAddBalance = async () => {
    // Validate the amount on the client side before making the API call
    if (!validateAmount(amountToAdd)) {
      return;
    }

    // Validate credit card information on the client side
    if (!validateCreditCardInfo()) {
      return;
    }

    const userID = user.id;

    const response = await Api.PostWithAuth(
      "/changeCupidCash",
      { changeAmount: amountToAdd, userID },
      context
    );

    if (!response.error) {
      // Update user profile with the new balance
      user.profile.balance = response.newBalance;
      context.updateUser(user);
      setUserBalance(response.newBalance);
      setAmountToAdd(0);
      // TODO: Uncomment this for release
      // setCreditCard('');
      // setExpirationDate('');
      // setCVV('');
      setErrorMessage(null); // Clear any previous error messages
    } else {
      setErrorMessage(response.error);
    }
  };

  return (
    <section className={classes.main}>
      <div>
        <p className="label">Current balance: {userBalance}</p>
      </div>
      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Error: {errorMessage}
        </div>
      )}
      <Input
        inputType="number"
        state={amountToAdd == 0 ? "" : amountToAdd}
        setState={setAmountToAdd}
        placeholder="Enter Amount"
      />
      <Input
        inputType="text"
        state={creditCard}
        setState={setCreditCard}
        placeholder="Card Number"
        validationFunc={(v) => creditCardValidation(v)}
      />
      <Input
        inputType="text"
        state={zip == 0 ? "" : zip}
        setState={setZip}
        placeholder="Zip"
      />
      <div className={classes.row}>
        <div className="w-50">
          <Input
            state={expirationDate}
            setState={setExpirationDate}
            placeholder={"Exp. Date"}
          />
        </div>
        <div className="w-50">
          <Input
            inputType="text"
            state={cvv}
            setState={setCVV}
            placeholder="CVV"
          />
        </div>
      </div>
      <Button onClickFunc={handleAddBalance} text="Add Cupid Cash" />
    </section>
  );
}

export default CupidCash;
