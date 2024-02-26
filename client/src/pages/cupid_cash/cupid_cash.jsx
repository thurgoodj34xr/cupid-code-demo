import classes from "./cupid_cash.module.css";
import Navbar from "../../componets/navbar/navbar";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../componets/app_context";

function CupidCash() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [amountToAdd, setAmountToAdd] = useState(0);

  const handleAmountChange = (event) => {
    // Ensure that the entered value is a positive number
    const newValue = Math.max(0, parseInt(event.target.value, 10) || 0);
    setAmountToAdd(newValue);
  };

  const handleAddBalance = () => {
    newTotal = amountToAdd + user.profile.balance
    user.updateUserBalance(newTotal)
  };

  return (
    <section>
      <Navbar title="Cupid Cash"></Navbar>
      <div>
        Welcome {user.firstName}, you currently have {user.profile.balance} cupid bucks in your account.
      </div>
      <div>
        <label htmlFor="addBalance">Add to Balance:</label>
        <input
          type="number"
          id="addBalance"
          name="addBalance"
          value={amountToAdd}
          onChange={handleAmountChange}
          min="0"
          step="5"
        />
        <button onClick={handleAddBalance}>Add to Balance</button>
      </div>
    </section>
  );
}

export default CupidCash;
