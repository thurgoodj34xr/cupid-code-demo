import classes from "./cupid_cash.module.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../componets/app_context";
import * as Api from "../../hook/api";

function CupidCash() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [amountToAdd, setAmountToAdd] = useState(5);
  const [creditCard, setCreditCard] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [userBalance, setUserBalance] = useState(user.profile.balance);
  const [errorMessage, setErrorMessage] = useState(null);

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
    const cleanedCreditCard = creditCard.replace(/\s/g, '');

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
    const enteredExpirationDate = new Date(`20${expirationDate.split('/')[1]}`, expirationDate.split('/')[0] - 1, 1);
    if (enteredExpirationDate < currentDate) {
      setErrorMessage("Card has expired. Please enter a valid expiration date.");
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

  const handleAmountChange = (event) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setAmountToAdd(newValue);
  };

  const handleCreditCardChange = (event) => {
    // Remove non-numeric characters from input
    const cleanedValue = event.target.value.replace(/\D/g, '');

    // Limit the credit card number to a maximum of 16 characters
    const truncatedValue = cleanedValue.slice(0, 16);

    // Format credit card number with spaces every 4 digits
    const formattedValue = truncatedValue.replace(/(\d{4})/g, '$1 ').trim();

    setCreditCard(formattedValue);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

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

    const response = await Api.PostWithAuth("/changeCupidCash", { changeAmount: amountToAdd, userID }, context);

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
    <section>
      <div>
        Welcome {user.firstName}, you currently have {userBalance} cupid bucks in your account.
      </div>
      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Error: {errorMessage}
        </div>
      )}
      <div>
        <label htmlFor="addBalance">Add to Balance:</label>
        <input
          type="number"
          id="addBalance"
          name="addBalance"
          value={amountToAdd}
          onChange={handleAmountChange}
          step="5"
        />
      </div>
      <div>
        <label htmlFor="creditCard">Credit Card Number:</label>
        <input
          type="text"
          id="creditCard"
          name="creditCard"
          value={creditCard}
          onChange={handleCreditCardChange}
          placeholder="xxxx xxxx xxxx xxxx"
        />
      </div>
      <div>
        <label htmlFor="expirationDate">Expiration Date (MM/YY):</label>
        <input
          type="text"
          id="expirationDate"
          name="expirationDate"
          value={expirationDate}
          onChange={handleExpirationDateChange}
          placeholder="MM/YY"
        />
      </div>
      <div>
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={cvv}
          onChange={handleCVVChange}
          placeholder="xxx"
        />
      </div>
      <button onClick={handleAddBalance}>Buy Cupid Cash!!</button>
    </section>
  );
}

export default CupidCash;
