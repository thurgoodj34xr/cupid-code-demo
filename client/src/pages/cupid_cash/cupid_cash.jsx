import { useState } from "react";
import Button from "../../componets/button/button";
import Input from "../../componets/inputs/input";
import ResponseMessage from "../../componets/responseMessage/responseMessage";
import Api from "../../hook/api";
import classes from "./cupid_cash.module.css";
import useContext from "../../hook/context";

function CupidCash() {
  const context = useContext();
  const user = context.getUser();
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [creditCard, setCreditCard] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [userBalance, setUserBalance] = useState(user.profile.balance);
  const [zip, setZip] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Client-side validation function
  const validateAmount = (value) => {
    // TODO: In release we need this to be set back to 0, leaving as -10 to demonstrate negative values are accepted
    if (isNaN(value) || value < 0) {
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

  function creditCardValidation(value) {
    // Remove non-numeric characters from input
    const cleanedValue = value.replace(/\D/g, "");

    // Limit the credit card number to a maximum of 16 characters
    const truncatedValue = cleanedValue.slice(0, 16);

    // Format credit card number with spaces every 4 digits
    const formattedValue = truncatedValue.replace(/(\d{4})/g, "$1 ").trim();
    return formattedValue;
  }

  function zipCodeValidation(value) {
    // Remove non-numeric characters from input
    const cleanedValue = value.replace(/\D/g, "");

    // Limit the zip code to a maximum of 5 characters
    const truncatedValue = cleanedValue.slice(0, 5);
    return truncatedValue;
  }

  function expirationDateValidation(value) {
    // Remove non-numeric characters from input
    const cleanedValue = value.replace(/\D/g, "");

    // Limit the month to a maximum of 4 characters
    const truncatedValue = cleanedValue.slice(0, 4);

    // Format month with a slash after the first two characters
    if (truncatedValue.length == 2) return truncatedValue;
    const formattedValue = truncatedValue
      .replace(/(\d{2})(\d{0,2})/, "$1/$2")
      .trim();
    return formattedValue;
  }

  function cvvValidate(value) {
    // Remove non-numeric characters from input
    const cleanedValue = value.replace(/\D/g, "");

    // Limit the cvv to a maximum of 3 characters
    const truncatedValue = cleanedValue.slice(0, 3);
    return truncatedValue;
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

    const userId = user.id;

    const response = await Api.PostWithAuth(
      "/profile/cash",
      { changeAmount: amountToAdd, userId },
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
      setSuccessMessage(`You successfully bought ${amountToAdd} CupidBucks`);
    } else {
      setSuccessMessage(null); // Clear previous success message
      setErrorMessage(response.error);
    }
  };

  return (
    <section className={classes.main}>
      <div>
        <p className="label">Current balance: {userBalance}</p>
      </div>
      {errorMessage && <ResponseMessage type="error" message={errorMessage} />}
      {successMessage && (
        <ResponseMessage type="success" message={successMessage} />
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
        validationFunc={(z) => zipCodeValidation(z)}
      />
      <div className={classes.row}>
        <div className="w-50">
          <Input
            state={expirationDate}
            setState={setExpirationDate}
            placeholder={"Exp. Date"}
            validationFunc={(date) => expirationDateValidation(date)}
          />
        </div>
        <div className="w-50">
          <Input
            inputType="text"
            state={cvv}
            setState={setCVV}
            placeholder="CVV"
            validationFunc={(cvv) => cvvValidate(cvv)}
          />
        </div>
      </div>
      <Button onClickFunc={handleAddBalance} text="Add Cupid Cash" />
    </section>
  );
}

export default CupidCash;
