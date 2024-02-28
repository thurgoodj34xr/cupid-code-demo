import classes from "./cupid_cash.module.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../componets/app_context";
import * as Api from "../../hook/api";

function CupidCash() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [userBalance, setUserBalance] = useState(user.profile.balance)

  const handleAmountChange = (event) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setAmountToAdd(newValue);
  };


  const handleAddBalance = async () => {
    const userID = user.id
    try {
      const response = await Api.PostWithAuth("/changeCupidCash", { changeAmount: amountToAdd, userID }, context);

      if (!response.error) {
        // Update user profile with the new balance
        user.profile.balance = response.newBalance;
        context.updateUser(user);
        setUserBalance(response.newBalance)
        setAmountToAdd(0)
      } else {
        console.log("Failed to update balance");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      // Handle other errors if necessary
    }
  };


  return (
    <section>
      <div>
        Welcome {user.firstName}, you currently have {userBalance} cupid bucks in your account.
      </div>
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
        <button onClick={handleAddBalance}>Add to Balance</button>
      </div>
    </section>
  );
}

export default CupidCash;
